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
import store from '../store'
import * as THREE from 'three'

import { Gui } from './plugins/gui'

// // three.interaction 방식
// // new a interaction, then you can add interaction-event with your free style
// const interaction = new Interaction(this.renderer, this.scene, this.camera)

// this.scene.resource.cursor = 'pointer'
// this.scene.resource.on('click', function (ev) {
//   // console.log(ev, interaction)
// })

/* raycaster 형식 클릭 이벤트 */

// 1번째 방식
// this.renderer.domElement.addEventListener('click', onclick, true)
// var selectedObject = this.scene.resource.obj
// var raycaster = new THREE.Raycaster()
// function onclick(event) {
//   alert('onclick')
//   var mouse = new THREE.Vector2()
//   raycaster.setFromCamera(mouse, this.render.camera)
//   var intersects = raycaster.intersectObjects(this.scene.resource.obj, true) //array
//   if (intersects.length > 0) {
//     selectedObject = intersects[0]
//     alert(selectedObject)
//   }
// }

// // 2번째 방식
// let pointer,
//   raycaster = false

// init()

// function init() {
//   raycaster = new THREE.Raycaster()
//   pointer = new THREE.Vector2()
//   document.body.appendChild(this.renderer.domElement)
//   document.addEventListener('pointerdown', onPointerDown)
// }

// function onPointerDown(event) {
//   pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)

//   raycaster.setFromCamera(pointer, this.camera)

//   const intersects = raycaster.intersectObjects(this.scene.resource.obj, false)

//   if (intersects.length > 0) {
//     const intersect = intersects[0]
//   }
// }

// 3번째 방식 -> three.projector을 이제 안쓴다함
// document.addEventListener('mousedown', onDocumentMouseDown, false)

// var projector = new THREE.Projector()

// function onDocumentMouseDown(event) {
//   event.preventDefault()

//   var vector = new THREE.Vector3(
//     (event.clientX / window.innerWidth) * 2 - 1,
//     -(event.clientY / window.innerHeight) * 2 + 1,
//     0.5
//   )
//   projector.unprojectVector(vector, this.camera)

//   var ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize())

//   var intersects = ray.intersectObjects(this.scene.resource.obj)

//   if (intersects.length > 0) {
//     intersects[0].object.materials[0].color.setHex(Math.random() * 0xffffff)
//   }

/*
    // Parse all the faces
    for ( var i in intersects ) {
        intersects[ i ].face.material[ 0 ].color
            .setHex( Math.random() * 0xffffff | 0x80000000 );
    }
    */
// }

// // 4번째 방식
// const raycaster = new THREE.Raycaster() // create once
// const mouse = new THREE.Vector2() // create once

// mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1
// mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1

// raycaster.setFromCamera(mouse, this.camera)

// const intersects = raycaster.intersectObjects(this.scene.resource.obj)

// 5번째 방식
// var projector = new THREE.Projector();

// function onDocumentMouseDown(event) {
//   var vector = new THREE.Vector3(event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
//   vector = vector.unproject(camera);
//   var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
//   var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

//   if (intersects.length > 0) {
//     intersects[0].object.material.transparent = true;
//     intersects[0].object.material.opacity = 0.1;
//   }

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

    // 3호기 클릭 해제 시
    if (!this.allSelectObject) {
      // console.log('선택해제')
      for (let i = 1; i < 5; i++) {
        allObject[i].children[0].material.forEach(element => {
          element.emissive.setHex(0x000000)
        })
      }
    }

    if (intersects.length > 0) {
      // 3호기 클릭 시
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
          console.log('모델 찾았습니다')
          // console.log(KeyShow.actions.actKeyShowMode('setKeyShowMode', 'true'))
          let keyControlShow = store.getters.keyShowMode
          console.log('keyControlShow before', keyControlShow)
          keyControlShow = 'true'
          console.log('keyControlShow after', keyControlShow)

          // 키 제어
          document.onkeydown = function (e) {
            if (e.keyCode === 40) {
              // keyDown
              // for (let i = 1; i < 4; i++) {
              //   allObject[i].forEach(element => {
              //     element.position.z -= 1
              //   })
              // }
              // scene.resource.edukit.yAxis -= 1
              allObject[1].position.y -= 1
              allObject[2].position.y -= 1
              allObject[3].position.y -= 1
            } else if (e.keyCode == 38) {
              // keyUp
              // scene.resource.edukit.yAxis += 1
              // allSelectObject.position.y += 1
              // allObject[1].position.y += 1
              // allObject[2].position.y += 1
              // allObject[3].position.y += 1
              // console.log(allSelectObject)
            } else if (e.keyCode == 37) {
              // keyLeft
              allObject[1].rotation.z -= 1
              // allObject[2].rotation.z -= 1
              // allObject[3].rotation.z -= 1
            } else if (e.keyCode == 39) {
              // keyRight
              allObject[1].rotation.z += 1
              // allObject[2].rotation.z += 1
              // allObject[3].rotation.z += 1
            }
          }
          return
        }
      }
    }
  }

  // Rendering Start
  render.start()

  // // three.interaction 방식
  // // new a interaction, then you can add interaction-event with your free style
  // const interaction = new THREE.Interaction(renderer, scene, cameraElement)

  // scene.resource.obj.children.cursor = 'pointer'
  // scene.resource.obj.children.on('click', function (ev) {
  //   console.log(ev, interaction)
  // })

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
