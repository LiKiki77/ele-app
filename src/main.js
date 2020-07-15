import Vue from "vue";
import App from "./App.vue";
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import router from "./router";
import store from "./store";
import axios from 'axios';
import Vant from 'vant';
import 'vant/lib/index.css';
import VueLazyLoad from 'vue-lazyload';
import vuePicturePreview from 'vue-picture-preview'  //引入图片查看器

import {  Indicator } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import {  InfiniteScroll } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Swipe, SwipeItem } from 'vant';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(MintUI);
Vue.use(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);
Vue.use(Toast);
Vue.use(Vant);
Vue.use(Swipe);
Vue.use(SwipeItem);

// 引用图片懒加载
Vue.use(VueLazyLoad,{
  error:'./static/error.png',             //报错需要的图片
  loading:'./static/loading.png'					// 替换需要的图片
})

Vue.use(vuePicturePreview);

// axios.defaults.baseURL = "https://ele-interface.herokuapp.com/";

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 加载动画
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error); 
  }
);
// 响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error); 
  }
);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
