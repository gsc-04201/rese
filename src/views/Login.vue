<template>
  <div>
    <div class="header flex">
      <Logo />
      <HeaderAuth />
    </div>
    <div class="container">
      <div class="background-blue">
        <p>Login</p>
      </div>
      <div class="card">
        <div class="form">
          <div class="flex icon-field">
            <i class="fas fa-envelope"></i>
            <input placeholder="Email" type="email" v-model="email"/>
          </div>
          <div class="flex icon-field">
            <i class="fas fa-lock"></i>
            <input placeholder="Password" type="password" v-model="password"/>
          </div>
          <button @click="auth">ログイン</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
import Logo from "../components/Logo";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
    HeaderAuth,
    Logo
  },
  methods: {
    auth() {
      if (this.email == "" || this.password == "") {
        alert("未入力の項目があります")
      }
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.header {
  justify-content: space-between;
}
button {
 width: 100px;
 padding: 8px 0 10px;
 color: #fff;
 background-color: #005add;
 border: 1px solid #ccc;
 border-radius: 10px;
 cursor: pointer;
}
.container {
  margin: 200px auto;
}
.card {
 margin: 0px auto;
 width: 350px;
 background: #fff;
 border-radius: 0 0 5px;
 padding: 10px 20px;
 box-shadow: 4px 4px 4px gray;

}
.background-blue {
  background:#005add;
  margin:0px auto;
  width: 350px;
  border-radius: 5px 5px 0 0;
  padding: 15px 20px;
  box-shadow: 4px 4px 4px gray
}
.background-blue p {
 color: #fff;
 font-weight: bold;
 text-align: left;
}
input {
 margin-top: 15px;
 width: 80%;
 padding: 10px;
 border-bottom: 1px solid black;
 color: black;
 border-top: none;
 border-left:none;
 border-right:none;
}
.form {
 text-align: right;
 
}
.form button {
 margin-top: 15px;
}
.fas {
  display: flex;
  font-size: 30px;
  margin: 30px 5px 0 0;
}
.flex {
  display: flex;
}
</style>