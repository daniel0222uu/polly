<template>
  <h1>Welcome to Flashcards!</h1>
  <label> 
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  
  <br><br><br>

  <div>
    <table class="center" style="width:250px; font-family:Kanit;font-size:26px;padding:10px">
      <tr><img src="http://localhost:8080/img/score-icon-21.jpeg" width="100" height="100"></tr>
      <tr> <marquee direction="right" behavior="scroll">L E A D E R B O A R D</marquee></tr>
    </table>
   
      <table class="center" style="width:250px; border: 5px solid black;border-radius: 10px;font-family: Kanit;font-size:20px;background-color: white;padding:10px">
        <tr>
          <th style="width: 70%;text-align: left" >Name</th>
          <th style="width: 30%;text-align: right">Score</th>
        </tr>
        <tr v-for="Item in ScoreData.sort(function(a,b){return b.points-a.points})" :key="Item.points">
          <td style="text-align:left" >{{ Item.name }}</td>
          <td style="text-align:right">{{ Item.points }}</td>
        </tr>
      </table>
        
  </div>


</template>

<script>
import Decks from "../assetts/Decks.json";

import Scores from "../assetts/Scores.json";


console.log(Decks);


export default {
  name: 'StartView',

  components: {
    
  },
  data: function () {
    return {
     
      id: "",
      
      hideNav: true,
      scoreNameField: "",
      scorePointField: "",
      ScoreData: Scores
    }
  },
  methods: {
    
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    },
    addToLeaderboard: function () {
      let name = this.scoreNameField;
      let points = this.scorePointField;
      if (name === "" || points === "") {
        console.log("Please fill in both fields")
        this.fieldAlert()
        return;
      }
      console.log(name);
      console.log(points);
      
      Scores.push({
        "name": name,
        "points": points
      });
    }
  },
  }

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Island+Moments&family=Kanit:ital,wght@1,300&family=Mukta:wght@200&display=swap');
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
    
    font-size: 1.5rem;
 }
  .center {
  margin-left: auto;
  margin-right: auto;
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