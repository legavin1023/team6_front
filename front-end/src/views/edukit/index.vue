<template>
  <div id="edukit">
    <div id="youtube" class="youtube">
      <div v-if="this.$store.getters.keyShowMode" class="embed-container">
        <iframe
          src="https://www.youtube.com/embed//p_mDR0fAk2g?autoplay=1&mute=1 "
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div id="btn_box">
      <button class="start btn">시작</button>
      <button class="stop btn">정지</button>
      <button class="reset btn">리셋</button>
      <!-- <button class="emergency btn">비상</button> -->
    </div>
    <helloEdukit />
    <details>
      <summary>MQTT 부분 제어</summary>
      <div id="button_box">
        <div>
          <label>
            1호기
            <input v-model="control.no1" type="checkbox" />
            <i></i>
          </label>
          <label>
            2호기
            <input v-model="control.no2" type="checkbox" />
            <i></i>
          </label>
          <label>
            3호기
            <input v-model="control.no3" type="checkbox" />
            <i></i>
          </label>
        </div>
        <div>
          <label>
            센서1
            <input v-model="control.sen1" type="checkbox" />
            <i></i>
          </label>
          <label>
            센서2
            <input v-model="control.sen2" type="checkbox" />
            <i></i>
          </label>
          <!-- {{ this.$store.getters.keyShowMode }} // 스토어 상태 확인용-->
        </div>
      </div>
    </details>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import helloEdukit from './edukit.vue'

export default {
  name: 'Edukit',
  components: {
    helloEdukit
  },
  data() {
    return {
      // PLC 프로세스 ON / OFF data들입니다.
      plc: {
        isPlcStart: null,
        isPlcStop: null,
        isPlcReset: null,
        isPlcEmergency: null
      },

      // PLC 내부기기 ON / OFF data들입니다.
      control: {
        no1: null,
        no2: null,
        no3: null,

        sen1: null,
        sen2: null
      }
    }
  },

  computed: {
    show() {
      return this.$store.getters.keyShowMode
    }
  },

  created() {
    this.publishMqtt()
  },
  methods: {
    publishMqtt(id, v) {
      // mqtt pubish
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)
      const topic = process.env.VUE_APP_MQTT_WRITE_TOPIC // UVC-Write
      const message = JSON.stringify({ tagId: id, value: v })
      // PLC 제어에 쓰이는 모든 publish message들은
      // { "tagId" : "id값", "value" : "value값" }으로 이루어져야 합니다.

      mqttClient.publish(topic, message, error => {
        console.log(message)
        if (error) {
          console.error('mqtt client error', error)
        }
      })
    }

    // async created() {
    // this.publishMqtt()
    // this.wsConnect()
    // this.socket = io('http://localhost:3001')
    // this.socket.on('connect', () => {
    //   console.log('hello socketio')
    // })
    // this.socket.on('msg', msg => {
    //   console.log(msg)
    // })
    // },
  }
}
</script>

<style lang="scss">
.hover {
  cursor: pointer;
}
details {
  position: fixed;
  z-index: 90;
  bottom: 330px;
  right: 40px;
  width: 190px;
  border: 3px solid $main;
  border-radius: 20px;
  padding: 10px 0;
  background: $dark;
  summary {
    text-align: center;
  }
  #button_box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    div {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 50%;
      padding: 0 0 0 8px;
      label {
        font-size: 0.8em;
        line-height: 2em;
        display: inline-block;

        padding: 10px 4px;
        > input {
          display: none;
        }
        i {
          display: inline-block;
          padding: 2px;
          width: 30px;
          height: 15px;
          border-radius: 13px;
          vertical-align: middle;
          transition: 0.25s 0.09s;
          position: relative;
          background: #d8d9db;
          box-sizing: initial;
          &:after {
            content: ' ';
            display: block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: #fff;
            position: absolute;
            left: 2px;
            transition: 0.25s;
          }
        }

        // Checked-state
        > input:checked + i {
          background: #4bd865;
        }

        > input:checked + i:after {
          transform: translateX(20px);
        }

        // Label-hover
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

// .top,
// .bottom,
// .left,
// .right {
//   z-index: 90;
//   position: fixed;
//   display: block;
//   z-index: 99;
//   width: 70px;
//   height: 70px;
//   text-align: center;
//   color: $light;
//   overflow: hidden;
//   opacity: 0.3;
// }
// .top {
//   left: 200px;
//   line-height: 90px;
//   bottom: 180px;
//   background: url('../../../src/assets/image/arrow.png') center/contain no-repeat;
// }
// .bottom {
//   line-height: 55px;
//   left: 200px;
//   bottom: 40px;
// }
// .left {
//   line-height: 70px;
//   text-indent: 10px;
//   left: 130px;
//   bottom: 110px;
// }
// .right {
//   line-height: 70px;
//   text-indent: -10px;
//   left: 270px;
//   bottom: 110px;
// }
// .bottom:before,
// .left:before,
// .right:before {
//   content: '';
//   position: absolute;
//   width: 70px;
//   height: 70px;
//   left: 0px;
//   background: url('../../../src/assets/image/arrow.png') center/contain no-repeat;
// }
// .bottom:before {
//   transform: rotate(180deg);
// }
// .left:before {
//   transform: rotate(270deg);
// }
// .right:before {
//   transform: rotate(90deg);
// }
// .up {
//   animation-name: upup;
//   animation-duration: 1s;
// }
// @keyframes upup {
//   0% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0.3;
//   }
// }
#btn_box {
  position: fixed;
  overflow: hidden;
  top: 50px;
  right: 40px;
  .btn {
    width: 50px;
    height: 50px;
    line-height: 40px;
    text-align: center;
    border-radius: 50px;
    margin-left: 20px;
    color: $light;
    background: rgba($color: rgb(168, 168, 168), $alpha: 0.5);
    border: 3px solid $light;
    cursor: pointer;
    opacity: 0.5;
  }
  .btn:hover {
    opacity: 1;
  }
  .start:hover {
    background: rgba($color: rgb(0, 255, 0), $alpha: 0.5);
    border: 3px solid #4bd865;
  }
  .stop:hover {
    background: rgba($color: rgb(255, 0, 0), $alpha: 0.5);
    border: 3px solid #ff0000;
  }
  .reset:hover {
    background: rgba($color: rgb(255, 247, 0), $alpha: 0.5);
    border: 3px solid #fff700;
  }
  .emergency:hover {
    background: rgba($color: rgb(255, 0, 0), $alpha: 1);
    border: 3px solid #ff0000;
  }
  .emergency {
    background: rgba($color: rgb(255, 0, 0), $alpha: 0.5);
    border: 3px solid #ff0000;
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
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.youtube {
  position: fixed;
  z-index: 9999;
  width: 600px;
  height: 350px;
  top: 50vh;
  left: 50vw;
  margin-top: -175px;
  margin-left: -300px;
  pointer-events: none;
}
</style>
