<template>
  <router-link
      v-bind:to="'/lobby/'+lobbyId"
  >
    <button style="
        background-color: #fec89a;
        border: solid black;
        color: black;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        font-family: 'Kanit', sans-serif;
        margin: 4px 2px;
        cursor: pointer;
        webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        border-radius: 15px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);"
        @click="joinLobby">Join lobby</button>
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