<template>
  <body>
  <div>
    <h1>"Multiplayer mode"</h1>
    <!--See the interface -->
    <canvas reference  = "game" width="640" height="480"
            style="border: 2px solid black">
    </canvas>
  </div>
  </body>
</template>

<script>
//Importing packages:
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
//const socket = io();
console.log(Decks);

export default {
  name: 'Multiplayer',
  data() {
    return {
      socket: {},
      context: {},

      //The coordinates for the deck to be placed at:
      position : {
        x: 0,
        y: 0
      }
    }
  },

  //Connection to the server:
  created() {
    this.socket = io("http://localhost:8080");
  },

  //  Want to display the decks with their content
  mounted() {
    this.context = this.$refs.decks.getContext("2d");
    this.socket.on("message") //Check the connection.
    this.context.fill(this.position.x, this.position.y)
  }
}

</script>

<style scoped>

body{
  background-color: aqua;
}

.h1 {
  font-style: normal;
  font-size: medium;
  alignment: center;
}
</style>