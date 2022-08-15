import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.prototype.$socket = new WebSocket("ws://localhost:8081");
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
