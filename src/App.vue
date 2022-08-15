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

type IData =
  | {
      function: "getTwinBalance";
      data: { twinId: number };
    }
  | {
      function: "getSomethingElse";
      data: { twinId: number };
    };

@Component({
  name: "App",
})
export default class App extends Vue {
  mnemonic = "";
  secret = "";
  loading = false;

  async onSubmit() {
    this.loading = true;
    const { mnemonic, secret } = this;
    const grid = await this.$grid(mnemonic, secret);
    const twinId = await grid.twins.get_my_twin_id();

    const socket = await this.$socket();

    socket.send(
      JSON.stringify({ event: "client_connected", data: { twinId } })
    );

    this.loading = false;
  }

  async created() {
    const socket = await this.$socket();

    socket.onmessage = async ({ data: _data }: { data: { data: IData } }) => {
      const { data } = JSON.parse(_data as unknown as string);
      console.log(data);

      switch (data.function) {
        case "getTwinBalance": {
          const grid = await this.$grid(this.mnemonic, this.secret);
          const twinInfo = await grid.twins.get({
            id: JSON.parse(data.data as unknown as string).twinId,
          });
          return socket.send(
            JSON.stringify({ event: data.function, data: twinInfo })
          );
        }

        default:
          return Promise.resolve(null);
      }
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
