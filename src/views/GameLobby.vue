<template>
  <BannerComponent />
  <body>
  <div id="GameLobbyPlayers">

    <h1>"Please choose your opponent:"</h1>

  </div>
  <!--<BarsComponent v-bind:data="submittedAnswers"/>-->
  <br>

  <div>

  </div>

  <button @click="Choose">Select</button>
  </body>
</template>

<script>
import io from 'socket.io-client';
import ResponsiveNav from '@/components/ResponsiveNav.vue';
const socket = io();

export default {
  name: "GameLobby",
  components: {
    ResponsiveNav
  }

}
</script>

<style scoped>
nav {
  background-color: lightgray;
  width:100%;
  height: 4em;
  display: grid;
  grid-template-columns: repeat(auto-fit, 10em);
}

nav ::v-slotted(a) {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: gray;
  display: grid;
  align-items: center;
  justify-content: center;
  border-left: 1px solid gray;
}

@media screen and (max-width:50em) {
  nav {
    position: absolute;
    height:100vh;
    top: 3em;
    left: 0;
    width:12em;
    display: grid;
    grid-template-rows: repeat(auto-fit, 2em);
    transition: 0.5s;
  }
  nav ::v-slotted(a) {
    justify-content: left;
    padding-left: 1em;
  }
  .hide {
    left:-12em;
  }
}

</style>