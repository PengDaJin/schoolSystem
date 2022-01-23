import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Element from "element-ui";
import axios from "axios";

import "element-ui/lib/theme-chalk/index.css";
import "./axios";
import "./permission";
import "normalize.css/normalize.css";
import md5 from 'js-md5';


import './assets/css/style.css'
import './assets/css/font.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Element);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; //axios引入
Vue.prototype.$md5 = md5;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
