import { Resource } from './resource'

let add = 0.2
let LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40

let keyCodeOn = function (e) {
  if (e.keyDown == LEFT) {
    add = -0.2
  } else if (e.keyDown == RIGHT) {
    add = +0.2
  } else if (e.keyDown == DOWN) {
    screen.orientation.x += add
  } else if (e.keyDown == UP) {
    screen.orientation.x -= add
  } else {
    return
  }
  Object.forEach(obj => (obj.position.x += add))
}
document.addEventListener('keydown', keyCodeOn, false)
