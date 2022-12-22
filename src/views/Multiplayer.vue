<template>
  <body>
  <div>
    <h1>"Multiplayer mode"</h1>
  </div>
  </body>
</template>


<script>

//Importing packages:
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
const socket = io();
console.log(Decks);

export default {
  name: 'Multiplayer',
  data() {
    return{
      socket:{},
      context:{},
    }
  },
  created() {
    this.socket = io("http://localhost:8080");
  },
  mounted() {
    //this.context = this.$refs.


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