import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Element from "element-ui";
import axios from "axios";
import httpRequest from '/src/utils/httpRequest' // api: https://github.com/axios/axios

import "element-ui/lib/theme-chalk/index.css";
import "./axios";
import "./permission";
import "normalize.css/normalize.css";
import md5 from 'js-md5';


import './assets/css/style.css'
import './assets/css/font.css'
import 'font-awesome/css/font-awesome.min.css'

import rjContentBox from '/src/components/rj-content-box'
import rjContent from '/src/components/rj-content'

Vue.component('rjContentBox', rjContentBox)
Vue.component('rjContent', rjContent)
Vue.use(Element);

Vue.prototype.$http = httpRequest // ajax请求方法
Vue.config.productionTip = false;
Vue.prototype.$axios = axios; //axios引入
Vue.prototype.$md5 = md5;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
