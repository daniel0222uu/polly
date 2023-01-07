<template>
  <router-link
      v-bind:to="'/lobby/'+lobbyId"
  >
    <button
            @click="joinLobby(lobbyId)"
    > Join lobby
    </button>
  </router-link>
</template>

<script>
import io from "socket.io-client";
const socket = io();
export default {
  name: "JoinLobbyComponent",
  props: ["lobbyId", "name"],
  methods: {
    joinLobby: function (lobbyToJoin) {
      console.log("I should've joined", lobbyToJoin);
      socket.emit("joinLobby", {lobbyID: this.lobbyId, name: this.name});
      this.navigate();
    },
  }
}
</script>

<style scoped>

</style>