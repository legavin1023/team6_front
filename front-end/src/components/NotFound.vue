<template>
  <div>
    <img src="@/assets/image/404.png" alt="" />
    <p>페이지를 찾을수 없습니다.</p>
    <button><router-link to="/home">홈으로 가기</router-link></button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    height: auto;
    margin-top: 200px;
  }
  p {
    margin-top: 20px;
  }
  button {
    border: 3px solid $main;
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    font-weight: bold;
    background: linear-gradient(45deg, rgba(136, 139, 191, 0.3) 0%, #ffffff00 100%);
    a {
      color: $light;
      font-family: 'NEXON Lv2 Gothic';
    }
  }
  button:hover {
    background: rgba(136, 139, 191, 0.3);
  }
}
</style>
