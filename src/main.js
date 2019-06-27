import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import axios from "./http/index";
//注册到vue原型上
Vue.prototype.axios = axios;

Vue.config.productionTip = false;
// 在正式环境中替换掉console
if (process.env.NODE_ENV !== "development") {
  window.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}

import { Toast, Loading, Tabbar, TabbarItem } from "vant";
Vue.use(Toast)
  .use(Loading)
  .use(Tabbar)
  .use(TabbarItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
