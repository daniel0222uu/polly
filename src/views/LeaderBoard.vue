<template>
  <!--
  <h1>Welcome to Flashcards!</h1>
  <label> 
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  -->

  <br><br>

  <!-- Div för att layout av startsidan -->
  <div id="startWrapper">


    <!-- Här presenteras Leaderboard -->
    <div id="viewLeaderboard" class="center">
    <table class="center" style="width:300px; font-family:Kanit;font-size:26px;padding:10px">
      <tr> <marquee direction="right" behavior="scroll">{{instantiateuiLabels.mostPoppular}}</marquee></tr>
      <tr><img src="http://localhost:8080/img/score-icon-21.jpeg" width="100" height="100"></tr>
    </table>
   
      <table class="center" style="width:300px; border: 5px solid black;border-radius: 10px;font-family: Kanit;font-size:20px;background-color: white;padding:10px">
        <tr>
          <th style="width: 70%;text-align: left" >{{instantiateuiLabels.deck}}</th>
          <th style="width: 30%;text-align: right">{{instantiateuiLabels.likes}}</th>
        </tr>
        <tr v-for="Item in DecksData.sort(function(a,b){return b.likes-a.likes})" :key="Item.likes">
          <td style="text-align:left" >{{ Item.id }}</td>
          <td style="text-align:right">{{ Item.likes }}</td>
        <!--<tr v-for="Item in ScoreData.sort(function(a,b){return b.points-a.points})" :key="Item.points">
          <td style="text-align:left" >{{ Item.name }}</td>
          <td style="text-align:right">{{ Item.points }}</td>-->
        </tr>
      </table>
        
    </div>

  </div>
<!-- Här slutar div för startsidan -->

</template>

<script>
import Decks from "../assetts/Decks.json";
import Scores from "../assetts/Scores.json";


console.log(Decks);


export default {
  name: 'LeaderBoard',

  components: {
    
  },

  inject: ['uiLabels'],

  data: function () {
    return {
     
      id: "",
      
      hideNav: true,
      scoreNameField: "",
      scorePointField: "",
      ScoreData: Scores,
      DecksData: Decks,
      instantiateuiLabels: this.uiLabels
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


#startWrapper {
  
  width: 100%;
  float: left;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px;
}

#infoFlashcard {
  width: 40%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  font-family: Kanit;
  font-size: 20px;
  text-align: left;
  margin-left: 30px;
}

#viewLeaderbord {
  width: 60%;
  text-align: center;
  justify-content: center;
}


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