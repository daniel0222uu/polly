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

    <!-- Här visas puff för Flashcard -->
    <div id="infoFlashcard">

      <p style="font-size:24px;font-weight:bold">Welcome to FLASHCARDS!</p>
      <p>"The world's most award-winning quiz game."</p>
      <p>Here you can challenge yourself and other players in quiz games.</p>
      <p>Flashcard now also includes functionality that lets you create your own decks of flashcards.</p>
      <p>Good luck!</p>

    </div>

  </div>
<!-- Här slutar div för startsidan -->

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


#startWrapper {
  width: 95%;
  float: left;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px;
  justify-content: center;
}

#infoFlashcard {
 z-index: -1;
  width: 50%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  font-family: Kanit;
  font-size: 20px;
  text-align: center;
  margin-left: 30px;
  border: 5px ridge lightseagreen;

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
 #infoFlashcard {
  font-size: 18px;
  width:70%
 }
}
@media screen and (max-width:24em) {
 #infoFlashcard {
  font-size: 14px;
  min-width:100%
 }
}


</style>