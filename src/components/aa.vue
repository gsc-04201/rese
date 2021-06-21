<template>
  <div id="app">
   <input type="number" v-model="postnumber" />
   <button @click="userclick">住所自動入力</button>
  <p>Address:{{streetaddress}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postnumber: ""
    };
  },
methods: {
  async userclick() {
    const post = await axios.get(
     `https://apis.postcode-jp.com/api/v4/postcodes/${this.postnumber}?apiKey=e1zaqkrdU2l9RaK3VaNbZCENsHIvZN0GkTNHPq2`);
  const userpost = await post.json();
  console.log(userpost);
 }
}
};
</script>












