/**
 * 모든 파트를 통합하는 메인 파일입니다
 * 매개변수: 3D 렌더링을 등록 할 Element Type Instance
 * 반환: 3D 렌더링이 등록된 Element Type Instance
 */
import { Scene } from "./assets/scene"
import { Renderer } from "./assets/renderer"
import { Control } from "./assets/control"
import { Render } from "./assets/render";

import { Gui } from "./plugins/gui"

import * as THREE from "three"

export default (element) => {
    element.style = "width:500px";

    // Scene Setting
    let scene = new Scene;
    let cameraElement = scene.camera.cameraElement;
    let sceneElement = scene.sceneElement;
    let resouceElement = scene.resource.obj;

    // Renderer Setting
    let renderer = new Renderer(element);
    let renderElement = renderer.domElement;
    let rendererElement = renderer.rendererElement;

    // Control Setting
    let control = new Control(cameraElement, renderElement);
    let controlElement = control.controlElement;
    
    // Render Setting
    let render = new Render;
    render.element = element;
    render.controls = controlElement;
    render.scene = sceneElement;
    render.camera = cameraElement;
    render.renderer = rendererElement;

    // Rendering Start
    render.start();

    // WebGL Context Lost Handling
    renderElement.addEventListener("webglcontextlost", event => {
        event.preventDefault();
        render.stop();
    }, false);

    // WebGL Context Restored Handling
    renderElement.addEventListener("webglcontextrestored", () => {
        render.start();
    }, false);

    // Dat.GUI Setting
    let gui = new Gui(element);
    let options = {
        "ScaleX": 1,
        "ScaleY": 1,
        "ScaleZ": 1,

        "PositionX": 0,
        "PositionY": 0,
        "PositionZ": 0,
    }
    gui.addOptions(options);
    gui.addFolder("Scene");

    gui.addScene("ScaleX", 1, 10, resouceElement.scale);
    gui.addScene("ScaleY", 1, 10, resouceElement.scale);
    gui.addScene("ScaleZ", 1, 10, resouceElement.scale);

    gui.addScene("PositionX", 0, 10, resouceElement.position);
    gui.addScene("PositionY", 0, 10, resouceElement.position);
    gui.addScene("PositionZ", 0, 10, resouceElement.position);

    return element;
}