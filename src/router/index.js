import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Thanks from '../views/Thanks.vue';
import Reserved from '../views/Reserved.vue';
import Detail from '../views/Detail.vue';
import Mypage from '../views/Mypage.vue';
import store from '../store/index';

// import { Store } from 'vuex'

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'login',
  component: Login
},{
  path: '/signup',
  name: 'signup',
  component: SignUp
},{
  path: '/thanks',
  name: 'Thanks',
  component: Thanks
},{
  path: '/home',
  name: 'Home',
  component: Home,
  meta: {
    requiresAuth: true,
  },
},{
  path: '/detail/:id',
  name: 'Detail',
  component: Detail,
  props: true,
  meta: {
    requiresAuth: true,
  },
},{
  path: '/mypage',
  name: 'Mypage',
  component: Mypage,
  meta: {
    requiresAuth: true,
  },
},

{
  path: '/reserved',
  name: 'Reserved',
  component: Reserved,
  meta: {
    requiresAuth: true,
  },
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) && !store.state.auth
  ) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;