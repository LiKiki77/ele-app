import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "index",
    component: () => import ('../views/index.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/Order.vue")
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/Profile.vue")
      },
      {
        path: "/addresses",
        name: "addresses",
        component: () => import("../views/Addresses.vue")
      },
      {
        path: "/city",
        name: "city",
        component: () => import("../views/City.vue")
      }
    ]
  },
  {
    path:"/login",
    name:"login",
    component: () => import('../views/Login.vue')
  },
  {
    path:"/search",
    name:"search",
    component: () => import('../views/Search.vue')
  },
  {
    path:"/shop",
    name:"shop",
    redirect: '/goods',
    component: () => import('../views/shops/Shop.vue'),
    children: [
      {
        path:"/goods",
        name:"goods",
        component: () => import('../views/shops/Goods.vue')
      },
      {
        path:"/comments",
        name:"comments",
        component: () => import('../views/shops/Comments.vue')
      },
      {
        path:"/seller",
        name:"seller",
        component: () => import('../views/shops/Seller.vue')
      }
    ]
  },
  {
    path:"/myAddress",
    name:"myAddress",
    component: () => import('../views/Orders/MyAddress.vue')
  },
  {
    path:"/addAddress",
    name:"addAddress",
    component: () => import('../views/Orders/AddAddress.vue')
  },
  {
    path:"/settlement",
    name:"settlement",
    component: () => import('../views/Orders/Settlement.vue')
  },
  {
    path:"/remark",
    name:"remark",
    component: () => import('../views/Orders/Remark.vue')
  },
  {
    path:"/pay",
    name:"pay",
    component: () => import('../views/Orders/Pay.vue')
  },
  {
    path:"/orderInfo",
    name:"orderInfo",
    component: () => import('../views/Orders/OrderInfo.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.ele_login ? true : false;
//   if (to.path == '/Login') {
//     next();
//   }else{
//     // 是否在登录状态下
//     isLogin ? next() : next('/Login');
//   } 
// });

export default router;
