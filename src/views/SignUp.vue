<template>
 <div>
  <HeaderAuth />
  <div class="container">
    <div class="background-blue">
      <p>Registration</p>
    </div>
    <div class="card">
      <div class="form">
        <div class="flex icon-field">
          <i class="fas fa-user"></i>
          <input placeholder="Username" type="text" v-model="name"/>
        </div>
        <div class="flex icon-field">
          <i class="fas fa-envelope"></i>
          <input placeholder="Email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" v-model="email"/>
        </div>
        <div class="flex icon-field">
          <i class="fas fa-lock"></i>
          <input placeholder="Password" type="password" pattern="^[0-9A-Za-z]+$	" v-model="password"/>
          <input placeholder="再確認用" type="password" v-model="repassword"/>
        </div>
        <button @click="auth">新規登録</button>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repassword:"",
    };
  },
  components: {
   HeaderAuth
  },
  methods: {
    auth() {
      if (this.name == "" || this.email == "" || this.password == "") {
        alert("未入力の項目があります")
      } else if(this.password != this.repassword)
      {
        alert("パスワードが一致していません")
      } else {
        axios.post("https://hidden-hamlet-97241.herokuapp.com/api/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          this.$router.replace("/thanks");
        })
        .catch(error => {
          alert(error);
        });

      }
      
    }
  }
};
</script>

<style scoped>
button {
 width: 100px;
 padding: 8px 0 10px;
 color: #fff;
 background-color: #005add;
 border: 1px solid #ccc; border-radius: 10px;
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
  background: #005add;
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