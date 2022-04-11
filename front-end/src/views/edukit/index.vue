<template>
  <div id="edukit">
    <button class="stop">비상 정지</button>
    <helloEdukit />
    <div>
      <span class="top" :class="{ up: isActiveT }">+y</span>
      <span class="bottom" :class="{ up: isActiveB }">-y</span>
      <span class="left" :class="{ up: isActiveL }">-x</span>
      <span class="right" :class="{ up: isActiveR }">+x</span>
    </div>
  </div>
</template>

<script>
// import mqtt from 'mqtt'
// import { io } from 'socket.io-client'
import helloEdukit from './edukit.vue'

export default {
  name: 'Edukit',
  components: {
    helloEdukit
  },
  data() {
    return {
      // 방향키 제어 관련 data들입니다.
      isActiveT: false,
      isActiveB: false,
      isActiveL: false,
      isActiveR: false

      // webSocket 관련 data들입니다.
      // socket: null,
      // wsAddress: 'ws://localhost:8088'

      // socketio-client 관련 data들입니다.
      // socket: null
    }
  },
  async created() {
    // this.publishMqtt()
    // this.wsConnect()
    // this.socket = io('http://localhost:3001')
    // this.socket.on('connect', () => {
    //   console.log('hello socketio')
    // })
    // this.socket.on('msg', msg => {
    //   console.log(msg)
    // })
  },
  methods: {
    // publishMqtt(message) {
    //   // mqtt pubish
    //   const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)
    //   const topic = toString(process.env.MQTT_TOPIC)
    //   message = JSON.stringify(message)

    //   mqttClient.publish(topic, message, error => {
    //     console.log(message)
    //     if (error) {
    //       console.error('mqtt client error', error)
    //     }
    //   })
    // },

    sendMessage() {
      // this.socket.emit(`SEND${process.env.VUE_APP_MQTT_TOPIC}`, 'hello socketio')
      // this.socket.emit('msg', 'hello socketio')
    }
  }
}
</script>

<style lang="scss">
.stop {
  border: 3px solid rgba(255, 0, 0, 0.1);
  color: #ff0000;
  display: block;
  width: 80px;
  height: 80px;
  line-height: 80px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 50px;
  position: fixed;
  z-index: 80;
  right: 40px;
  top: 60px;
  transition-duration: 1s;
  cursor: pointer;
}
.stop:hover {
  border: 3px solid rgba(255, 0, 0, 1);
  background: rgba(255, 0, 0, 0.5);
  color: #fff;
}
.top,
.bottom,
.left,
.right {
  z-index: 90;
  position: fixed;
  display: block;
  z-index: 99;
  width: 70px;
  height: 70px;
  text-align: center;
  color: $light;
  overflow: hidden;
  opacity: 0.3;
}
.top {
  left: 200px;
  line-height: 90px;
  bottom: 180px;
  background: url('../../../src/assets/image/arrow.png') center/contain no-repeat;
}
.bottom {
  line-height: 55px;
  left: 200px;
  bottom: 40px;
}
.left {
  line-height: 70px;
  text-indent: 10px;
  left: 130px;
  bottom: 110px;
}
.right {
  line-height: 70px;
  text-indent: -10px;
  left: 270px;
  bottom: 110px;
}
.bottom:before,
.left:before,
.right:before {
  content: '';
  position: absolute;
  width: 70px;
  height: 70px;
  left: 0px;
  background: url('../../../src/assets/image/arrow.png') center/contain no-repeat;
}
.bottom:before {
  transform: rotate(180deg);
}
.left:before {
  transform: rotate(270deg);
}
.right:before {
  transform: rotate(90deg);
}
.up {
  animation-name: upup;
  animation-duration: 1s;
}
@keyframes upup {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
#edukit {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.dg {
  width: 190px;
  position: fixed;
  bottom: 320px;
  right: 40px;
  color: $sub1;
  ul {
    border-radius: 20px;
    background: none;

    li {
      border-radius: 20px;
      background: none;
      .property-name {
        padding-left: 10px;
      }
      li.title {
        text-indent: -15px;
        text-align: center;
      }
      .c {
        padding-right: 10px;
        .slider {
          margin-left: -30px;
        }
        input[type='text'] {
          width: 50px;
          display: block;
        }
      }
    }
  }
  .close-button {
    border-radius: 20px;
  }
}
#MQTT {
  margin-left: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 40px;
  right: 40px;
  input {
    border: 3px solid $main;
    height: 30px;
    border-radius: 20px;
    margin-bottom: 10px;
    padding-left: 10px;
  }
  button {
    border: 3px solid $main;
    border-radius: 20px;
    padding: 10px 20px;
    width: 190px;
    margin-top: 10px;
    color: $main;
    cursor: pointer;
    font-weight: bold;
    background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #ffffff00 100%);
  }
  button:hover {
    background: rgba(136, 139, 191, 0.3);
  }
  .textOn {
    border: 3px solid $main;
    border-radius: 20px;
    padding: 10px 20px;
    width: 190px;
    margin-top: 10px;
    color: $main;
    font-weight: bold;
    text-align: center;
  }
}
</style>
