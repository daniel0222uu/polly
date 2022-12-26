<template>
  <BannerComponent />
  <BarsComponent />
  <body>
    <div class="left split">
      <FlashcardView />
      <div class="centered">
        <!-- The quiz frame should appear here-->
        <canvas
          reference="gamer1"
          width="640"
          height="480"
          style="border: 2px solid black"
        >
        </canvas>
        <h2>Your deck</h2>
      </div>
    </div>

    <div class="right split">
      <FlashcardView />
      <div class="centered">
        <canvas
          reference="gamer2"
          width="640"
          height="480"
          style="border: 2px solid black"
        >
        </canvas>

        <h2>Opponents deck</h2>
      </div>
    </div>
  </body>
</template>

<script>
import io from "socket.io-client";
//import Decks from "../assetts/Decks.json";

import BarsComponent from "@/components/BarsComponent.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import FlashcardView from "@/views/FlashcardView";
import NewDecks from "../assetts/NewDecks.json";
// const socket = io(); Denna behövs inte
console.log(NewDecks);

export default {
  name: "Multiplayer",
  components: {
    BannerComponent,
    FlashcardView,
    //NewDecks,
    BarsComponent,
  },

  // Returns the socket connection content as well as info of the deck
  data() {
    return {
      socket: {},
      context: {},
    };

    //console.log(context)

    //async mounted() {
    //  const newgame = await import(Decks);
    //  this.gameInstance = newgame.launch(this.containerId)
  },

  //Connects to the server on 8080
  created() {
    this.socket = io("http://localhost:8080");
  },

  //Makes a 2d multiplayer game
  mounted() {
    this.context = this.$refs.gamer1.getContext("2d");
    this.context = this.$refs.gamer2.getContext("2d");

    //Server listening:
    this.socket.on("Deck:", (data) => {});
  },
};
</script> 

<!-- CSS-->
<style scoped>
body {
  font-family: Arial;
  color: white;
}

.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.left {
  left: 0;
  background-color: blue;
}

.right {
  right: 0;
  background-color: black;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>

