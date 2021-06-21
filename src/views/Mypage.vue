<template>
  <div id="mypage">
    <Logo/>
    <div class="mypage flex">
      <div class="left">
        <h2>予約状況</h2>
        <div class="grid1">

          <div class="reservation-card" v-for="(data, ind) in reservations" :key="ind">
            <div class="title flex">
              <i class="far fa-clock"></i>
              <p>予約No.{{ind+1}}</p>
              <i class="far fa-times-circle" @click="deleteReservation(ind)"></i>
            </div>
            <div class="reservation-info">
              <table>
                <tr>
                  <th>店舗名</th>
                  <td>{{data.store.name}}</td>
                </tr>
                <tr>
                  <th>予約日</th>
                  <td>{{data.date}}</td>
                </tr>
                <tr>
                  <th>来店時間</th>
                  <td>{{data.time}}</td>
                </tr>
                <tr>
                  <th>来店人数</th>
                  <td>{{data.number}}</td>
                </tr>
              </table>
            </div>
          </div>

        </div>
        
      </div>

      <div class="right">
        <h2>お気に入り店舗</h2>
        <div class="grid2">
          <div class="item" v-for="(list, index) in likedData" :key="index">
            <img :src="list.store.img" alt="">
            <h3 class="name text">{{list.store.name}}</h3>
            <p class="text">#{{list.store.area.name}}#{{list.store.genre.name}}</p>
            <div class="box flex">
              <!-- <button class="detail" @click="transitionDetail(index)">詳しくみる</button> -->
              <!-- <div class="btn" @click="transitionDetail(index)">
                <div class="btn-inner">
                  <p>詳しくみる</p>
                </div>
              </div> -->
                <div class="btn-inner1" @click="transitionDetail(index)">
                  <p>詳しくみる<span><i class="fas fa-arrow-right"></i></span></p>
                </div>

              <div class="fas fa-heart red" @click="deleteFav(index)"></div>

            </div>
          </div>
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
  components: {
    Logo
  },
  data() {
    return {
      user_id: this.$store.state.user.id,
      reservations:[],
      likedData:[],
    }
  },
  methods: {
    deleteReservation(ind) {
      axios.delete(url + 'reservation/' + this.user_id, {
        data: {store_id: this.reservations[ind].store_id}
      })
      .then((res) => {
        console.log(res);
        this.$router.go({path: this.$router.currentRoute.path, force: true});
      })
      .catch((err)=> {
        console.log(err);
      })
    },
    deleteFav(index) {
      console.log(index);
      axios.delete(url + 'like/' + this.user_id, {
      data: {store_id: this.likedData[index].store_id}
      })
      .then((res) => {
        console.log(res);
        this.$router.go({path: this.$router.currentRoute.path, force: true});
      })
      .catch((err)=> {
        console.log(err);
      })
    },
    transitionDetail(index){
      this.$router.push({name:"Detail",params:{id:this.likedData[index].store_id}});
    },
  },
  created() {
    axios.get(url + 'reservation/' + this.user_id)
    .then((res) => this.reservations = res.data.data);
    // .then((res) => console.log(res.data.data));
    axios.get(url + 'like/' + this.user_id)
    .then((res) => this.likedData = res.data.data);
    // .then((res) => console.log(res.data.data));
  }
}
</script>

<style scoped>


/* 全体 */
.mypage {
  margin-top: 15px;
}
.left {
  width:35%;
  margin: 0 5px;
}
.right {
  width: 65%;
  margin: 0 5px;
}
.grid1 {
  display: grid;
  grid-template-columns: 1fr;
}
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/* reservation */
.reservation-card {
  padding: 15px;
  border: double 5px #fff;
  margin: 13px 10px 5px 0;
  background: skyblue;
  border-radius: 5px;
}
.title {
  justify-content: space-between;
  background:rgb(063, 163, 203);
  border-radius: 25px;
  align-items: center;
  color:#fff;
}
.far {
  font-size: 24px;
}
.far:hover {
  color:red;
  font-size: 34px;
  cursor: pointer;
}
.reservation-info {
  width:100%;
  margin-top: 30px;
  padding: 10px 0;
  text-align: left;
  background-color:#fff;
  border-radius: 5px;
}
.reservation-info th {
  font-size: 14px;
  font-weight: 100;
  padding: 15px;
}

/* お気に入りリスト */
.item {
 background: #fff;
 border-radius: 0 0 5px;
 padding-bottom: 15px;
 box-shadow: 4px 4px 4px gray;
 margin: 15px 15px 0px 0px;
}
.text {
  padding:5px;
}
/* detail-btn */
.box {
  align-items: center;
  margin-top: 5px;
}
/* .btn{
  background: blue;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 3px;
  width:80px;
}
.btn-inner{
  background: blue;
  border: 1px solid #fff;
  border-radius: 3px;
  padding:3px;
  font-size: 13px;
  font-weight: 600;
  color:#fff;
  text-align: center;
}
.btn:hover {
  border: 1px solid red;
  background-color: red;
}
.btn-inner:hover {
  color: red;
  background-color: #fff;
  cursor: pointer;
} */
.red{
  font-size: 20px;
  cursor:pointer;
  width:10%;
  margin-left: 10px;
  color: red;
}
.red:hover {
  font-size: 24px;
}
/* btn */
.btn-inner1 {
  border: 2px solid #000;
  border-radius: 30px;
  padding: 5px;
  width:80px;
  text-align: center;
  cursor: pointer;
}
.btn-inner1 p {
  font-size: 8px;
}
.fas {
  margin-left: 5px;
}
.btn-inner1:hover {
  background: #000;
  color: #fff;
}


</style>