/**
 * 모든 파트를 통합하는 메인 파일입니다
 * 매개변수: 3D 렌더링을 등록 할 Element Type Instance
 * 반환: 3D 렌더링이 등록된 Element Type Instance
 */
import { Scene } from './assets/scene'
import { Renderer } from './assets/renderer'
import { Control } from './assets/control'
import { Render } from './assets/render'
import { Event } from './assets/event'
import * as THREE from 'three'

import { Gui } from './plugins/gui'

export default async element => {
  element.style.width = 'window.innerWidth'
  element.style.height = 'window.innerHeight'

  // Scene Setting
  let scene = new Scene('edukit')
  let cameraElement = scene.camera.cameraElement
  let sceneElement = scene.sceneElement

  // Renderer Setting
  let renderer = new Renderer(element)
  let renderElement = renderer.domElement
  let rendererElement = renderer.rendererElement

  // Control Setting
  let control = new Control(cameraElement, renderElement)
  let controlElement = control.controlElement

  // Render Setting
  let render = new Render()
  render.element = element
  render.controls = controlElement
  render.scene = sceneElement
  render.edukit = scene.resource.edukit
  render.camera = cameraElement
  render.renderer = rendererElement

  /* raycaster 형식 클릭 이벤트 */

  document.addEventListener('click', onclick, true)

  let selectedObject = null
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  function onclick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, cameraElement)
    const intersects = raycaster.intersectObjects(scene.resource.obj.children, true) //array

    // object define
    const allObject = scene.resource.obj.children

    if (!this.allSelectObject) {
      for (let i = 1; i < 5; i++) {
        allObject[i].children[0].material.forEach(element => {
          element.emissive.setHex(0x000000)
        })
      }
    }

    if (intersects.length > 0) {
      const res = intersects.filter(function (res) {
        return res && res.object
      })[0]
      if (res && res.object) {
        selectedObject = res.object
        const allSelectObject =
          selectedObject.parent.name == 'StaticMesh1' ||
          selectedObject.parent.name == 'StaticMesh2' ||
          selectedObject.parent.name == 'StaticMesh3' ||
          selectedObject.parent.name == 'StaticMesh4'

        if (allSelectObject) {
          for (let i = 1; i < 5; i++) {
            allObject[i].children[0].material.forEach(element => {
              element.emissive.setHex(0x9e4fd4)
            })
          }
          alert('모델 찾았습니다')
          return
        }
      }
    }
  }

  // Rendering Start
  render.start()

  // WebGL Context Lost Handling
  renderElement.addEventListener(
    'webglcontextlost',
    event => {
      event.preventDefault()
      render.stop()
    },
    false
  )

  // WebGL Context Restored Handling
  renderElement.addEventListener(
    'webglcontextrestored',
    () => {
      render.start()
    },
    false
  )

  // Dat.GUI Setting
  let gui = new Gui(element)
  let options = {
    yAxis: -27,
    xAxis: -4375
  }
  gui.addOptions(options)
  gui.addFolder('에듀킷 3호기 제어')

  gui.addExample('yAxis', -27, 1301828, scene.resource.edukit)
  gui.addExample('xAxis', -4375, 25021563, scene.resource.edukit)

  // MQTT Event Setting
  new Event(element, scene.resource.edukit)

  return element
}
