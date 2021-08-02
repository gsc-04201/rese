<template>
  <div>
    <div class="header flex">
      <div class="left flex">
        <Logo/>
      </div>
      <div class="mypage">
        <div class="fas fa-user flex" @click="$router.push('/mypage')">
          <p>my menu</p>
        </div>
      </div>
      <div class="right flex">
        <div class="select">
          <p>area</p>
          <select v-model="selectedArea">
            <option :value="0">All area</option>
            <option v-for="(area, index) in areas" :key="index" :value="area.name">
              {{area.name}}
            </option>
          </select>
        </div>

        <div class="select">
          <p>genre</p>
          <select v-model="selectedGenre">
            <option :value="0">All Genre</option>
            <option v-for="(genre, index) in genres" :key="index"
            :value="genre.name">
              {{genre.name}}
            </option>
          </select>
        </div>

        <div class="search">
          <i class="fas fa-search"></i>
          <input v-model="keyword" type="text" placeholder="Search...">
        </div>
      </div>
    </div>

    <div class="container grid">
      <div class="item" v-for="(data, index) in filteredStore" :key="index">
        <img :src="data.img" alt="">
        <h3 class="name text">{{data.name}}</h3>
        <p class="text">#{{data.area.name}}#{{data.genre.name}}</p>
        <div class="box">
          <div class="btn" @click="transitionDetail(index)">
            <div class="btn-inner">
              <p>詳しくみる</p>
            </div>
          </div>

          <div class="fas fa-heart red" @click="deleteFav(index)" v-if="isActive(index)"></div>
          <div class="fas fa-heart faa-pulse animated-hover" @click="postFav(index)" v-else></div> 

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "../components/Logo";
import axios from "axios";
const url = 'https://hidden-hamlet-97241.herokuapp.com/api/';

export default {
  components: {
    Logo
  },
  data() {
    return {
      user_id: this.$store.state.user.id,
      keyword: '',
      selectedArea: '',
      selectedGenre: '',

      areas:[],
      genres:[],
      stores:[],
      likedData:[],
    };
  },

  computed: {
    // 検索メソッド
    filteredStore() {
      const storeArray = [];
      if (this.selectedArea !== '' || this.selectedGenre !== '' || this.keyword !=='') {
        for (const i in this.stores) {
          const store = this.stores[i];
          if (store.area.name.indexOf(this.selectedArea) !== -1 && 
          store.genre.name.indexOf(this.selectedGenre) !== -1 && 
          store.name.indexOf(this.keyword) !== -1) {
            storeArray.push(store);
          }
          if (this.selectedArea === 0 || this.selectedGenre === 0) {
            if (store.area.name.indexOf(this.selectedArea) !== -1 ||
            store.genre.name.indexOf(this.selectedGenre) !== -1) {
              storeArray.push(store);
            }
          }
          if (this.selectedArea === 0 && this.selectedGenre === 0) {
            storeArray.push(store);
          }
        }
        return storeArray;
      }
      return this.stores;
    }
  },
  methods: {
    isActive(index) {
      const isLike = this.likedData.some(value => {
        return value.store_id === this.filteredStore[index].id
      });
      // console.log(isLike);
      if(isLike) {
        return true;
      } else {
        return false;
      }
    },
    postFav(index) {
      axios.post(url + 'like', {
        user_id: this.user_id,
        store_id: this.filteredStore[index].id
      })
      .then((res) => {
        console.log(res);
        this.$router.go({path: this.$router.currentRoute.path, force: true});
      });
    },
    deleteFav(index) {
      axios.delete(url + 'like/' + this.user_id, {
      data: {store_id: this.filteredStore[index].id}
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
      this.$router.push({name:"Detail",params:{id:this.filteredStore[index].id}});
    },
  },

  created: function() {
    axios.get(url + 'store')
    .then((res) => this.stores = res.data.data);
    // .then((res) => console.log(res.data.data));
    axios.get(url + 'area')
    .then((res) => this.areas = res.data.data);
    axios.get(url + 'genre')
    .then((res) => this.genres = res.data.data);
    axios.get(url + 'like/' + this.user_id)
    .then((res) => this.likedData = res.data.data);
  },
};
</script>

<style scoped>
/* mypage */
.mypage {
  margin:auto;
  align-items: center;
}
.fa-user {
  font-size: 28px;
  margin: auto;
  align-items:flex-end;
  cursor: pointer;
}
.fa-user p {
  font-size: 14px;
}


.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 50px;
}
.item {
 background: #fff;
 border-radius: 0 0 5px;
 padding-bottom: 15px;
 box-shadow: 4px 4px 4px gray;
}

.text {
  padding:5px;
}
/* detail-btn */
.box {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.btn{
  background: blue;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 3px;
  width:80px;
}
.btn-inner{
  background: blue;
  border: 1px solid #fff;
  border-radius: 3px;
  padding:5px;
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
}

.fa-heart{
  font-size: 20px;
  cursor:pointer;
  width:10%;
  margin-left: 5px;
  color: gray;
  padding: 0 10px;
}
.red{
  font-size: 20px;
  cursor:pointer;
  width:10%;
  margin-left: 5px;
  color: red;
}
.red:hover {
  font-size: 24px;
}

img {
  width:100%;
}


.header {
 margin: 15px;
}
.right {
 align-items: center;
 border: 1px solid #ccc;
 border-radius: 5px;
 background: #fff;
 padding:10px;
}
.flex {
 display: flex;
 justify-content: space-between;
}
input {
  border: none;
  border-radius: 5px;
  margin: 0 5px;
}
.select {
  display: flex;
  border-right: solid #ccc;
  margin-right: 10px;
}
select {
  border: none;
  margin:0 20px;
  padding:0 10px;
}
</style>

    //   selectedArea: async function() {
      //     if (this.selectedArea == 'Allarea') {
        //     let dataArea = 
  //     await axios.get(url + 'store');      
  //     this.stores = dataArea.data.data
  //     } else if(this.selectedArea === '0') {
    //       let dataArea = 
  //       await axios.get(url + 'store');
  //       this.stores = dataArea.datadata
  //     } else {
    //       return this.stores;
  //     }
  //   },
  //   selectedGenre: async function() {
    //     const dataGenre = await axios.get(url + 'genre/' + this.selectedGenre)
  //     this.stores = dataGenre.data.data
  //   }
  // },