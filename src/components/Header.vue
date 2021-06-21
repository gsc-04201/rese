<template>
 <div class="header flex">
   <div class="left">
     <i @click="$router.push('/mypage')" class="fas fa-user">   my menu</i>
   </div>
   <div class="right flex">
     <div class="select">
       <p>All area</p>
       <select v-model="selected" name="bloodtype" id="">
         <option v-for="(area, index) in areas" :key="index" v-bind:value="area.id">
           {{area.name}}
         </option>
       </select>

     </div>

     <div class="select">
       <p>All genre</p>
       <select name="bloodtype" id="">
         <option v-for="genre, index in genres" :key="index">
           {{genre.name}}
         </option>
       </select>
     </div>
     <div class="search">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search...">
     </div>
   </div>
 </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // stores: [],
      // selectedValue:5,
      areas:[],
      genres:[],
    };
  },
  created: function() {
    axios.get('https://hidden-hamlet-97241.herokuapp.com/api/area')
    .then((res) => this.areas = res.data.data);
    // axios.get('https://hidden-hamlet-97241.herokuapp.com/api/genre')
    // .then((res) => this.genres(res.data.data));

  },
};
</script>





<style scoped>
.header {
 margin: 15px;
}
.left {
  padding:15px;
}
.right {
 align-items: center;
 border: 1px solid #ccc;
 border-radius: 5px;
 background: #fff;
 padding:10px;
 /* width: 50%; */
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
.fas {
  padding:0 10px;
}
</style>