<template>
  <body>
  <div>
    <header>"Multiplayer mode"</header>
    <!--See the interface
    <canvas reference  = "game" width="640" height="480"
            style="border: 2px solid black">
    </canvas> -->
  </div>

  <div class = "Left player">
    <h2> Your game:</h2>
  </div>

  <div class = "right player">
    <h2>"Opponent's game</h2>
  </div>

  </body>
</template>


<script>
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
import BarsComponent from '@/components/BarsComponent.vue';
import BannerComponent from '@/components/BannerComponent.vue';
//import FlashcardView from "@/views/FlashcardView";
const socket = io("http://localhost:8080");
console.log(Decks);

export default {
  name: "NewMultiplayer",
  components: {
//    FlashcardView,
    BannerComponent,
    BarsComponent,
    Decks,
  },

  // Returns the content as well as info
  data() {
    return {
      //socket: {},
      context: {},
    }

    console.log(context)

    //async mounted() {
    //  const newgame = await import(Decks);
    //  this.gameInstance = newgame.launch(this.containerId)
  }
}
}

//Connects to the server on local host
created() {
  this.socket = io("http://localhost:8080");
}
}

</script>

<style scoped>

body{
  background-color: aqua;
}

header {
  font-style: normal;
  font-size: medium;
  alignment: center;
}

</style>
