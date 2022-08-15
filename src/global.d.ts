import { Socket } from "socket.io";
import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $socket: WebSocket;
  }
}
