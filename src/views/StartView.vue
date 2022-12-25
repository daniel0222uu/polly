<template>
  <BannerComponent />
  <h1>Welcome to Flashcards!</h1>
  <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
  <br><br><br>

  <!-- Här skriver jag leaderboard-->
  <div style= "display: flex; text-align:left;margin:0 auto;">
  
    <!--Det här är första kolumnen-->
    <div style= "width: 10%">
    </div>
  
     <!--Det här är andra kolumnen-->
     <div style= "width: 50%;border: 1px solid black; background-color: white; padding: 10px">
      <p><strong>Leaderboard</strong></p>
        <ul>
          <li v-for="Item in ScoreData.sort(function(a,b){return b.points-a.points})" :key="Item.points">{{ Item.name }} {{ Item.points }}</li>
        </ul>
    </div>

     <!--Det här är tredje kolumnen-->
     <div style= "width: 40%">
    </div>
  
  </div>



 
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue';
import Decks from "../assetts/Decks.json";
import io from 'socket.io-client';
import Scores from "../assetts/Scores.json";

const socket = io();
console.log(Decks);


export default {
  name: 'StartView',
  components: {
    BannerComponent
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true,
      ScoreData: Scores
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
