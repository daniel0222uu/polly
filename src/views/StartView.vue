<template>
  <br><br>

  <!-- Div för att layout av startsidan -->
  <div id="startWrapper">

    <!-- Här visas puff för Flashcard -->
    <div id="infoFlashcard">

      <h1 >Welcome to FLASHCARDS!</h1>
      <p>"The world's most award-winning quiz game."</p>
      <p>Here you can challenge yourself and other players in quiz games.</p>
      <p>Flashcard now also includes functionality that lets you create your own decks of flashcards.</p>
      <p>Good luck!</p>

    </div>

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

    },
  };

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
  width: 40%;
  background-color: rgb(107, 168, 218);
 
  padding: 30px;
  font-family: Kanit;
  font-size: 20px;
  text-align: center;
  margin-left: 30px;
  border: 5px ridge steelblue;

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

  .center {
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width:50em) {
 #infoFlashcard {
  font-size: 16px;
  width:70%
 }
}
@media screen and (max-width:24em) {
 #infoFlashcard {
  font-size: 12px;
  min-width:80%
 }
 h1 {
  font-size: 18px;
 }
}


</style>