<template>
  <div class="Detail">
    <div class="container flex">
      <div class="store-detail">
        <Logo/>
        <div class="title flex">
          <p class="btn-flat-simple" @click="$router.push('/home')">
            <i class="fa fa-caret-left"></i>
          </p>
          <h2>{{this.stores.name}}</h2>
        </div>

        <img class="store-img" :src="this.stores.img" alt="">
        <div class="information flex">
          <p>#{{this.stores.area.name}}</p>
          <p>#{{this.stores.genre.name}}</p>
        </div>
        <p class="store-text">{{this.stores.detail}}</p>
      </div>




      <div class="reservation">
        <div class="reservation-title">
          <h2>予約ページ</h2>
        </div>
        <form action="" @submit.prevent="postReservation()">
          <div class="input-box half">
            <label for="date">予約日</label><br>
            <input type="date" class="input-date" v-model="date" required>
          </div>
          
          
          <div class="input-box">
            <label for="time">予約時間</label><br>
            <input type="search" class="input-time" list="time-list" v-model="time" placeholder="選択してください" required>
            <datalist id="time-list">
              <option value="16:00"></option>
              <option value="16:30"></option>
              <option value="17:00"></option>
              <option value="17:30"></option>
              <option value="18:00"></option>
              <option value="18:30"></option>
              <option value="19:00"></option>
              <option value="19:30"></option>
              <option value="20:00"></option>
              <option value="20:30"></option>
              <option value="21:00"></option>
              <option value="21:30"></option>
            </datalist>
          </div>
          
          <div class="input-box">
            <label for="number">御来店人数</label><br>
            <input type="search" class="input-number" list="num-list" v-model="number" placeholder="選択してください" required/>
            <datalist id="num-list">
              <option value=1></option>
              <option value=2></option>
              <option value=3></option>
              <option value=4></option>
              <option value=5></option>
              <option value=6></option>
              <option value=7></option>
              <option value=8></option>
              <option value=9></option>
              <option value=10></option>
            </datalist>
          </div>
          
        </form>
        <div class="reservation-info">
          <table>
            <tr>
              <th>店舗名</th>
              <td>{{this.stores.name}}</td>
            </tr>
            <tr>
              <th>予約日</th>
              <td>{{this.date}}</td>
            </tr>
            <tr>
              <th>来店時間</th>
              <td>{{this.time}}</td>
            </tr>
            <tr>
              <th>来店人数</th>
              <td>{{this.number}}</td>
            </tr>
          </table>
        </div>

        <div class="check-btn" @click="openModal">
          <p>予約確認</p>
        </div>
        
        
      </div>
    </div>

    <div id="overlay" v-if="show">
      <div id="content">
        <p class="check-text">予約確認</p>
        <div id="content2">
          <div class="reservation-info over">
            <table>
              <tr>
                <th>店舗名</th>
                <td>{{this.stores.name}}</td>
              </tr>
              <tr>
                <th>予約日</th>
                <td>{{this.date}}</td>
              </tr>
              <tr>
                <th>来店時間</th>
                <td>{{this.time}}</td>
              </tr>
              <tr>
                <th>来店人数</th>
                <td>{{this.number}}</td>
              </tr>
            </table>
          </div>
        </div>

        
        <div class="btn flex">
          <!-- <p @click="sentReservation">予約</p> -->
          <p class="btn1" @click="closeModal">戻る</p>
          <p class="btn2" @click="postReservation">予約</p>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Logo from "../components/Logo";
const url = 'https://hidden-hamlet-97241.herokuapp.com/api/';
export default {
  props: ["id"],
  components: {
    Logo
  },
  data() {
    return {
      user_id: this.$store.state.user.id,
      stores:[],
      date:"",
      time:"",
      number:"",
      show: false,
    }
  },
  methods: {
    openModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    postReservation() {
      axios.post(url + 'reservation', {
        user_id: this.user_id,
        store_id: this.stores.id,
        date: this.date,
        time: this.time,
        number: this.number
      })
      .then((res) => {
        console.log(res);
        // this.$router.go({path: this.$router.currentRoute.path, force: true});
        this.$router.push({name:"Reserved"});
      })
      .catch(error=>{
        alert("予約内容を確認して下さい");
        console.log(error);
        // this.$router.push({name:'Detail',params:{id:this.stores.store_id}})
      })
    },


  },
  created: function() {
    axios.get(url + 'store/' + this.$route.params.id)
    .then((res) => this.stores = res.data.data[0]);
    // .then((res) => console.log(res.data.data[0]));
  },
};
</script>

<style scoped>
.Detail {
  width: 90%;
  margin: 70px auto;
  /* background-color: #fff; */
}
.flex {
  display: flex;
}
/* left側 */
.store-detail {
  width:100%;
}
.title {
  width: 100%;
  padding:20px 0px;
  font-size: 24px;
  align-items: center;
}
.store ,h1{
  margin: 5px;
}
.store-img {
  width:85%;
  margin: 10px auto;
}
.information {
  margin: 15px auto;
}
.store-text {
  font-size: 14px;
  width:80%;
  line-height: 1.5;
  letter-spacing: 1px;
}

/* right側 */
.reservation {
  width: 85%;
  background-color: skyblue;
  border-radius: 5px;
  margin:20px 0;
  padding:40px;
}
.reservation-title {
  /* background-color: #ccc; */
  padding:15px 0;
  font-size: 20px;
  text-align: center;
  color:#fff;
  letter-spacing: 3px;
}

.input-box {
  margin:10px 0px;
}
.input-box label {
  font-size:14px;
}
.half {
  width:50%;
}
input {
  width: 100%;
  margin-top: 2px;
}
.reservation-info {
  width:100%;
  margin-top: 40px;
  padding: 10px 0;
  text-align: left;
  background-color:#fff;
}
.reservation-info th {
  font-size: 14px;
  font-weight: 100;
  padding: 15px;
}

/* check-btn */
.check-btn {
  text-align: center;
  background: blue;
  color:#fff;
  border-radius: 5px;
  transition: .4s;
  margin-top: 50px;
  padding:20px;
}
.check-btn:active {
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  border-bottom: none;
}


/* バックボタン */
.fa {
  font-size: 32px;
  margin-right: 5px;
  /* padding: 5px; */
}
.btn-flat-simple {
  padding: 3px 10px;
  color: #00BCD4;
  background: #ececec;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: slategray;
}
.btn-flat-simple:hover {
  background: #00bcd4;
  color: white;
}

/* モーダルウィンドウ */
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  margin-top: 20px;
  text-align: center;
  z-index: 2;
  width: 35%;
  padding: 10px;
  background: #fff;
}
#content p {
  margin-top: 15px;
}
/* check-text */
.check-text {
  position: relative;
  display: inline-block;
  padding: 0 55px;
}

.check-text:before, .check-text:after {
  content: '';
  position: absolute;
  top: 50%;
  display: inline-block;
  width: 45px;
  height: 1px;
  background-color: black;
}

.check-text:before {
  left:0;
}
.check-text:after {
  right: 0;
}

#content2 {
  margin:15px;
  background-color: #ccc;
}
.btn {
  justify-content: space-between;
  margin:5px 10px;
}
.btn1 {
  width:150px;
  padding:10px;
  background-color: green;
  border-radius: 5px;
  color:#fff;
}
.btn2 {
  width:150px;
  padding:10px;
  background-color: blue;
  border-radius: 5px;
  color:#fff;
}

</style>