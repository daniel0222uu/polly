<template>
  <router-link
      v-bind:to="'/lobby/'+lobbyId"
  >
    <button
            @click="joinLobby"
    > Join lobby
    </button>
  </router-link>
</template>

<script>
import io from "socket.io-client";
const socket = io();
export default {
  name: "JoinLobbyComponent",
  props: ["lobbyId", "name",'lobbyCreated','inviteSent'],
  methods: {
    joinLobby: function () {
      socket.emit("joinLobby", {lobbyID: this.lobbyId, name: this.name});
      this.navigate();
      this.$router.push('/lobby/'+this.lobbyId);
    },
  },
  watch: {
    lobbyCreated: function () {
    },
  }
}
</script>

<style scoped>

</style>