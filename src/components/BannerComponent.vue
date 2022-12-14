<template>
     <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo"> <a href=""><img src="/img/logo2.jfif"></a>Quiz quizzing</div>
  </header>
  <ResponsiveNav v-bind:hideNav="hideNav">
    <a href="">Home/Hem</a>
    
    <router-link v-on:click="keepLanguage" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <router-link v-on:click="keepLanguage" v-bind:to="'/result/'+lang">{{uiLabels.results}}</router-link>
    <a href="">Pricing</a>
    <a href="">About</a>
    <a href="">Settings</a>
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
  </ResponsiveNav>

</template>


<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();


export default {
    name: 'BannerComponent',
    components: {
        ResponsiveNav,
    },
    data: function () {
        return {
            uiLabels: {},
            id: "",
            lang: "en",
            hideNav: true
        }
    },
    created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    keepLanguage: function() {
      socket.emit("switchLanguage", this.lang)

    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    }
  }
}
</script>


<style scoped>

header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }
  
   .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  
  .logo img {
    height:5rem;
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
    /*
    align-items: center;
    justify-content: center; */
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