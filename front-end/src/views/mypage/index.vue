<template>
  <div v-if="modal == true" class="black-bg">
    <div class="white-bg">
      <span class="xbtn">X</span>
      <span class="my">마이페이지</span>
      <p>{{}}</p>
      <p>{{}}</p>
      <p>{{}}</p>
      <p>{{}}</p>
      <button>수정하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: true
    }
  }
}
</script>

<style lang="scss" scoped>
.black-bg {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.white-bg {
  width: 300px;
  height: 370px;
  border-radius: 20px;
  padding: 20px;
  background: $light;
  text-align: center;
  .xbtn {
    display: block;
    text-indent: -9999px;
    width: 30px;
    height: 30px;
    background: url('../../assets/image/x.png') center/cover no-repeat;
    margin: auto;
    position: relative;
    cursor: pointer;
    left: 115px;
  }

  .my {
    display: block;
    text-indent: -9999px;
    width: 70px;
    height: 70px;
    background: url('../../assets/image/my.png') center/cover no-repeat;
    margin: auto;
  }
  p {
    margin-top: 20px;
  }
  button {
    border: 3px solid $main;
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 20px;
    color: $main;
    cursor: pointer;
    font-weight: bold;
    background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #ffffff00 100%);
  }
  button:hover {
    background: rgba(136, 139, 191, 0.3);
  }
}
</style>
