<template>
  <div id="edukit">
    <helloEdukit />
  </div>
</template>

<script>
import helloEdukit from './edukit.vue'

export default {
  name: 'Edukit',
  components: {
    helloEdukit
  }
}
</script>

<style lang="scss">
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
