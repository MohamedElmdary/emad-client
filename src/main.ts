import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const SOCKET = new WebSocket("ws://localhost:8081");

Vue.prototype.$socket = () => {
  return new Promise<WebSocket>((resolve) => {
    SOCKET.onopen = () => {
      resolve(SOCKET);
      SOCKET.onopen = null;
    };
  });
};
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
