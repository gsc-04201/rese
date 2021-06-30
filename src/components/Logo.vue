<template>
  <div class="header">
    <div class="header-btn" @click="transitionHome"></div>
    <h1>Rese</h1>
  </div>
</template>

<script>
export default {
  methods:{
    transitionHome(){
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin:30px 0px 0px 30px;
}
.header-btn{
  width: 60px;
  height: 55px;
  background: url(../assets/human_logo.png) no-repeat;
  background-size: contain;
  cursor: pointer;
  text-align: center;
}
.header h1 {
  font-size: 32px;
  text-align: center;
}
</style>