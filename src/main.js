import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import moment from "moment";



import "@/icons"; // icon
import "@/permission"; // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from "../mock";
if (process.env.NODE_ENV === "production") {
  mockXHR();
}


// set ElementUI lang to EN
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

Vue.filter("formatTime", function(value) {
  if (value) {
    return moment(String(value)).format("kk:mm");
  }
});
Vue.filter("formatYear", function(date) {
  return moment(date).format("YYYY");
});

//format tanggal dalam bentuk angka {supix-2019-10-08}
Vue.filter("formatDate", function(date) {
  return moment(date).format("DD-MM-YYYY kk:mm");
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
