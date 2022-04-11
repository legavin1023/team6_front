<template>
  <div id="edukit">
    <div id="btn_box">
      <button class="sart btn">시작</button>
      <button class="stop btn">정지</button>
      <button class="reset btn">리셋</button>
      <button class="emergency btn">비상</button>
    </div>
    <helloEdukit />
    <!-- <div>
      <span class="top" :class="{ up: isActiveT }">+y</span>
      <span class="bottom" :class="{ up: isActiveB }">-y</span>
      <span class="left" :class="{ up: isActiveL }">-x</span>
      <span class="right" :class="{ up: isActiveR }">+x</span>
    </div> -->
    <details>
      <summary>MQTT 부분 제어</summary>
      <div id="button_box">
        <div>
          <label>
            1호기
            <input type="checkbox" />
            <i></i>
          </label>
          <label>
            2호기
            <input type="checkbox" />
            <i></i>
          </label>
          <label>
            3호기
            <input type="checkbox" />
            <i></i>
          </label>
        </div>
        <div>
          <label>
            센서1
            <input type="checkbox" />
            <i></i>
          </label>
          <label>
            센서2
            <input type="checkbox" />
            <i></i>
          </label>
        </div>
      </div>
    </details>
  </div>
</template>

<script>
import helloEdukit from './edukit.vue'

export default {
  name: 'Edukit',
  components: {
    helloEdukit
  },
  data: function () {
    return {
      // isActiveT: false,
      // isActiveB: false,
      // isActiveL: false,
      // isActiveR: false
    }
  },
  mounted() {
    // window.addEventListener('keyup', event => {
    //   if (event.keyCode === 38) {
    //     this.isActiveT = true
    //     setTimeout(() => {
    //       this.isActiveT = false
    //     }, 1000)
    //   } else {
    //     this.isActiveT = false
    //   }
    //   if (event.keyCode === 40) {
    //     this.isActiveB = true
    //     setTimeout(() => {
    //       this.isActiveB = false
    //     }, 1000)
    //   } else {
    //     this.isActiveB = false
    //   }
    //   if (event.keyCode === 37) {
    //     this.isActiveL = true
    //     setTimeout(() => {
    //       this.isActiveL = false
    //     }, 1000)
    //   } else {
    //     this.isActiveL = false
    //   }
    //   if (event.keyCode === 39) {
    //     this.isActiveR = true
    //     setTimeout(() => {
    //       this.isActiveR = false
    //     }, 1000)
    //   } else {
    //     this.isActiveR = false
    //   }
    // })
  },
  methods: {
    activeTop() {}
  }
}
</script>

<style lang="scss">
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
  .sart:hover {
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
</style>
