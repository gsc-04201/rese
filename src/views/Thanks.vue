<template>
  <div>
    <div class="header flex">
      <Logo />
      <HeaderAuth />
    </div>
    <div class="container">
      <div class="card">
        <p class="thanks-text">
          会員登録ありがとうございます
        </p>
        <button @click="$router.push('/')">ログインする</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
import Logo from "../components/Logo";
export default {
 components: {
   HeaderAuth,
   Logo
 }
};
</script>

<style scoped>
.header {
  justify-content: space-between;
}
button {
 width: 150px;
 padding: 5px 0px;
 color: #fff;
 background-color: #005add;
 border: 1px solid #ccc;
 border-radius: 10px;
 cursor: pointer;
}
.thanks-text {
  padding: 30px;

}
.container {
  margin: 200px auto;
}
.card {
 margin: 0px auto;
 width: 350px;
 background: #fff;
 border-radius: 0 0 5px;
 padding: 50px 20px;
 box-shadow: 4px 4px 4px gray;
 text-align:center;
}
</style>