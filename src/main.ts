import { io } from "socket.io-client";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.prototype.$socket = io("ws://localhost:8081");
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
