<template>
  <BannerComponent />
  <h1>Welcome to Flashcards!</h1>
  <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
  <div>
    <upload-component></upload-component>
  </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue';
import Decks from "../assetts/Decks.json";
import io from 'socket.io-client';
import UploadComponent from "@/components/UploadComponent";

const socket = io();
console.log(Decks);


export default {
  name: 'StartView',
  components: {
    UploadComponent,
    BannerComponent
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true
    }
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    }
  }
}
</script>
<style scoped>
  /*header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  } */
  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  }
  .hamburger {
    color:white;
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
}
</style>
