<template>
  <br><br>

  <!-- Div för att layout av startsidan -->
  <div id="startWrapper">

    <!-- Här visas puff för Flashcard -->
    <div id="infoFlashcard">

      <h1 >{{instantiateuiLabels.welcomeTo}}</h1>
      <p>{{instantiateuiLabels.worldsMostAward}}</p>
      <p>{{instantiateuiLabels.challengeOthers}}</p>
      <p>{{instantiateuiLabels.includesFunctionality}}</p>
      <p>{{instantiateuiLabels.goodLuck}}</p>

    <!--
      Välkommen till FLASHCARDS!
      "Världens mest prisbelönta frågesport"
      Här kan du utmana dig själv och andra spelare i frågesport.
      Flazhcards innehåller nu också funktionalitet för att skapa egna kortlekar.
      Lycka till!
    -->

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
  inject: ['uiLabels'],
  data: function () {
    return {
      id: "",
      hideNav: true,
      scoreNameField: "",
      scorePointField: "",
      ScoreData: Scores,
      instantiateuiLabels: this.uiLabels
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
  background-color: rgba(70, 131, 180, 0.941);
 
  padding: 30px;
  font-family: Kanit;
  font-size: 20px;
  text-align: center;
  margin-left: 30px;
  border: 5px ridge rgb(99, 151, 193);

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