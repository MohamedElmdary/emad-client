<template>
  <div id="app">
    <form @submit.prevent="onSubmit()">
      <div>
        <label>
          <p>Mnemonic</p>
          <input type="password" placeholder="Mnemonic" v-model="mnemonic" />
        </label>
      </div>

      <br />

      <div>
        <label>
          <p>Secret</p>
          <input type="password" placeholder="Secret" v-model="secret" />
        </label>
      </div>

      <br />

      <button type="submit" :disabled="!mnemonic || !secret || loading">
        Calculate My Balance
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getGrid } from "./utils/getGrid";

@Component({
  name: "App",
})
export default class App extends Vue {
  mnemonic = "";
  secret = "";
  loading = false;

  onSubmit() {
    this.loading = true;
    const { mnemonic, secret } = this;
    getGrid(mnemonic, secret)
      .then((grid) => {
        return grid.twins.get_my_twin_id();
      })
      .then((twin) => {
        console.log({ twin });
      })
      .finally(() => {
        this.loading = false;
      });
  }

  async created() {
    console.log("here?");

    const socket = await this.$socket();

    socket.send(JSON.stringify({ event: "client_connected", values: "emad" }));

    socket.onmessage = (e) => {
      console.log(e.data);
      return null;
    };
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #333;
}

form {
  display: block;
  margin: 50px;
}
</style>
