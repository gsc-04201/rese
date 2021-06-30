<template>
 <div>
  <Logo/>
  <div class="container">
    <div class="card">
      <p class="thanks-text">
        ご予約ありがとうございます
      </p>

      <button @click="$router.push('/home')">店舗一覧に戻る</button>
    </div>
  </div>
 </div>
</template>

<script>
import Logo from "../components/Logo";
export default {
 components: {
   Logo
 }
};
</script>

<style scoped>
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