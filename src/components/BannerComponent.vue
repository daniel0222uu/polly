<template>
     <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]"
         v-on:click="toggleNav">
    </div>
    <div class="logo"> 
      
      
      <router-link class="logo" v-bind:to="'/'" style="text-decoration:none">flashcards</router-link>
   
   
    </div>
    
    
   
    
  </header>
  <ResponsiveNav v-bind:hideNav="hideNav">

    <router-link  v-bind:to="'/'">Home</router-link>
    <router-link  v-bind:to="'/mydecks/'+ lang">{{uiLabels.myDecks}}</router-link>
    <router-link  v-bind:to="'/play/'+lang">{{uiLabels.play}}</router-link>
    <router-link  v-bind:to="'/leaderboard/'+lang">{{uiLabels.leaderboard}}</router-link>
    
    
    
    <div class="flag" v-on:click="switchLanguage">
      <img v-if="lang=='sv'" style="width:100%; height:100%" 
      src= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/383px-Flag_of_Sweden.svg.png'
      />

      <img v-if="lang=='en'" style="width:100%; height:100%" 
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1920px-Flag_of_the_United_Kingdom_%283-5%29.svg.png'
      />
    </div>
    
    
  </ResponsiveNav>
  

</template>


<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();
import svenska from '../../data/labels-sv.json';
import engelska from '../../data/labels-en'


export default {
    name: 'BannerComponent',
    components: {
        ResponsiveNav,
    },
    data: function () {
        return {
            uiLabels: engelska, 
            id: "",
            lang: "en",
            hideNav: true
        }
    },
    created: function () {
    socket.on("init", (labels) => {
      /*this.uiLabels = labels */
      console.log("lang change " + labels)
      
    })
  },
  methods: {
    switchLanguage: function() {
      console.log("language switch")
      if (this.lang === "en")
        this.lang = "sv",
        this.uiLabels = svenska
        
        
      else
        this.lang = "en",
        this.uiLabels = engelska
        console.log("langggg" + this.lang)
        
        /* socket.emit("switchLanguage", this.lang) */
        
    },
   
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    }
  }
}
</script>


<style scoped>

.flag {
  user-select: none;
  margin-left:50px; 
  margin-top:14px;
  height: 30px; 
  width: 45px;
  

}



header {
   
    width:auto;
    display: flex;
    
    justify-content: center;
    align-items: center;
  
   
    margin-bottom: 10px;
    margin-top: 10px;
    
   
  }

  
   .logo {
    width:100%;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    font-size: 2.5rem;
    color:rgb(3, 30, 81);
    
    
    padding:5px;
    margin:5px;
   
  
    

  }
  .hamburger {
    color:rgb(11, 61, 128);
    z-index: 1;
    width:1em;
    display: flex;
    align-items: center; 
    justify-content: left; 
    padding: 0.5rem;
    margin-bottom:12px;
    top:0;
    left:0;
    height: 2rem;
    font-size: 2rem;
    
  }
  
  .logo img {
    height:5rem;
    vertical-align: center;  
    margin-right: 0.5rem; 
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