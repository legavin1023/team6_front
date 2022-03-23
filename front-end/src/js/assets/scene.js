/**
 * Three.js의 Scene을 셋팅하는 파트입니다
 */
import * as THREE from 'three'
import { Resource } from './resource'
import { Camera } from './camera'
import { Light } from './light'

class Scene {
  constructor(file = null) {
    this.scene = new THREE.Scene()

    this.resource = new Resource(file)
    this.camera = new Camera()
    this.light = new Light()

    this.setScene()
    this.setParticle()
    // this.setMesh()
    // this.setGrid()
  }

  setScene() {
    this.scene.background = new THREE.Color(0x101010)

    this.scene.add(this.resource.obj)

    this.scene.add(this.light.ambientLight)

    this.scene.add(this.camera.camera)
  }

  setParticle() {
    // 파티클 생성
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCnt = 1000 // 파티클 갯수

    const posArray = new Float32Array(particlesCnt * 3) // x,y,z 값이 존재하기 때문에 * 3 = Multiply by 3 because each position is composed of 3 values (x, y, z)

    for (let i = 0; i < particlesCnt * 3; i++) {
      // 골고루 퍼지게
      posArray[i] = (Math.random() - 0.5) * (Math.random() * 1000)
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    // Textures
    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load(require('../../assets/image/particle.png'))

    // Materials
    const material = new THREE.PointsMaterial({
      map: particleTexture,
      transparent: true,
      opacity: 0.5
    })
    material.size = Math.random() * 10
    material.sizeAttenuation = true

    // color
    // material.color = new THREE.Color('0xFFFFFF')

    // // Textures
    // const textureLoader = new THREE.TextureLoader()
    // const particleTexture = textureLoader.load('../../assets/image/particle.png')
    // material.transparent = true
    // material.alphaMap = particleTexture

    // // Textures
    // const textureLoader = new THREE.TextureLoader()

    // // load a resource
    // textureLoader.load(
    //   '../../assets/image/particle.png',
    //   function (texture) {
    //     this.material.map = texture
    //   },

    //   // onProgress callback currently not supported
    //   undefined,

    //   // onError callback
    //   function (err) {
    //     console.error('particle texture error', err)
    //   }
    // )

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material)

    // add it to the scene
    this.scene.add(particlesMesh)

    //mouse 좌표값 설정
    document.addEventListener('mousemove', animateParticles)

    let mouseX = 0
    let mouseY = 0

    function animateParticles(event) {
      mouseY = event.clientY
      mouseX = event.clientX
    }

    /**
     * Animate
     */

    const clock = new THREE.Clock()

    const animate = () => {
      window.requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      // 경과 시간 (Update objects)

      particlesMesh.rotation.y = -1 * (elapsedTime * 0.01)
      // 파티클이 경과 시간마다 음의 방향으로 이동

      if (mouseX > 0) {
        // 마우스 좌표값에 따라 움직임
        particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.000003)
        particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.000003)
      }
    }

    animate()
  }

  // setMesh() {
  //   this.mesh = new THREE.Mesh(
  //     new THREE.PlaneGeometry(1000, 1000),
  //     new THREE.MeshPhongMaterial({ color: 0x1a1a1a, depthWrite: false })
  //   )
  //   this.mesh.rotation.x = -Math.PI / 2
  //   this.mesh.receiveShadow = true

  //   this.scene.add(this.mesh)
  // }

  // setGrid() {
  //   this.grid = new THREE.GridHelper(2000, 300, 0x000000, 0x000000)
  //   this.grid.material.opacity = 0.3
  //   this.grid.material.transparent = true

  //   this.scene.add(this.grid)
  // }

  setLight() {
    this.scene.add(this.light.dirLight)
  }

  setLightHelper() {
    this.helper = new THREE.CameraHelper(this.light.dirLight.shadow.camera)
    this.scene.add(this.helper)
  }

  removeHelper() {
    this.scene.remove(this.helper)
  }

  setCameraHelper() {
    this.helper = new THREE.CameraHelper(this.camera.cameraElement)
    this.scene.add(this.helper)
  }

  get sceneElement() {
    return this.scene
  }
}

export { Scene }
