<template>
  <!-- <div>
     Poll link:
     <input type="text" v-model="pollId">
     <button v-on:click="createPoll">
       Create poll
     </button>
     <div>
       {{uiLabels.question}}:
       <input type="text" v-model="question">
       <div>
         Answers:
         <input v-for="(_, i) in answers"
                v-model="answers[i]"
                v-bind:key="'answer'+i">
         <button v-on:click="addAnswer">
           Add answer alternative
         </button>
       </div>
     </div>
     <button v-on:click="addQuestion">
       Add question
     </button>
     <input type="number" v-model="questionNumber">
     <button v-on:click="runQuestion">
       Run question
     </button>
     {{data}}
     <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
   </div> -->

  <br>
  <br>
  <br>
  <br>
  <br>

  <div>
    <form>
      <input type="text" v-model="quizName">
      {{quizName}}
      <button @click="nameDeck(quizName)" >Döp</button> Vad vill du döpa quizen till?
      {{deckName}}
    </form>
  </div>
  <div>
    <form>
      <input type="text" v-model="questionField">
      {{quizQuestions}}
      <button @click="questionsToDeck(questionField)"> add question
      </button>
      <br>
      <input type="text" v-model="answerField">
      {{quizAnswers}}
      <button @click="answersToDeck(answerField)"> answer to question
      </button>
    </form>
  </div>
  {{completeDeck}}

  <br>
  <br>
  <br>

  <div>
    <form>
      <button @click="saveDeck" >Klar</button> Är du klar med din quiz? Klicka på knappen
    </form>
  </div>


  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <button @click="getDecks">Get Decks</button>
  <div>
    <select name="drinks" required>
      <option value="" disabled selected hidden>Choose a drink</option>
      <option v-for="drink in options" v-bind:key="drink">{{ drink }}</option>
      <!--  <option v-for="fraga in selectorList" :value="fraga">{{ fraga.id }}<option> -->
    </select>
  </div>

  <div>

  </div>

</template>


<script>
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
const socket = io();
//const items = {localStorage};
//console.log(items);
console.log(Decks);
//let testObj = JSON.stringify(Decks);
//localStorage.setItem("theDeckObject", testObj)
//console.log(testObj);
//let myObj_deserialized = JSON.parse(localStorage.getItem("theDeckObject"));
//console.log(myObj_deserialized);

//console.log(JSON.parse(localStorage.getItem("daniel")));









export default {
  name: 'CreateView',
  data: function () {
    return {
      options:["Mangoo","Apple","Orange","Melon","Pineapple","Lecy","Blueberry"],
      quizName: "",
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      questionObject:   {"id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]}, //Nu gjorde vi om så att objektet inte är i en lista, fungerar
      //att hämta från singulär objekt.
      questionPosition: 0,
      answerButtonBool: false,
      questionField: "",
      answerField: "",
      deckName: "",
      quizQuestions: [],
      quizAnswers: [],
      selectorList:[],
      //testingObject: JSON.parse(localStorage.getItem("daniel")),
      //completeDeck: {"id":this.deckName, "questionArray": this.quizQuestions, "answerArray":this.quizAnswers}
    }
  },
  components:{

  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
    saveDeck: function(){
      console.log("du klickade på en knapp med say()")
      let completeDeck = {"id": this.deckName,"questionArray": this.quizQuestions,"answerArray": this.quizAnswers};
      //defined on render. Inte bra vet inte varför.
      console.log(completeDeck);
      localStorage.setItem(completeDeck.id, JSON.stringify(completeDeck));
    },
    getDecks: function () {
      let listToFill = [];
      for (var i =0, len = localStorage.length; i< len; ++i ) {
        listToFill.push(localStorage.key(i));
      }
      this.selectorList = listToFill;
    },
    nameDeck: function(namingTheDeck){
      //let id =  '{"id" :' + '"' + namingTheDeck + '" \n  }';
      console.log(namingTheDeck)
      this.deckName = namingTheDeck;
      //let deSerializedid = JSON.parse(id);
      //console.log(deSerializedid);
      //localStorage.setItem(namingTheDeck, id)
      //let myObj_deserialized = JSON.parse(localStorage.getItem(namingTheDeck));
      //localStorage.setItem(namingTheDeck,id);
      //console.log(myObj_deserialized);
    },
    questionsToDeck: function(questionToAdd){
      this.quizQuestions.push(questionToAdd);
      console.log(this.quizQuestions);
      //console.log(this.quizQuestions);
      //let myObj_deserialized = JSON.parse(localStorage.getItem(namingTheDeck));
      //console.log(myObj_deserialized);
    },
    answersToDeck: function(answerToAdd){
      this.quizAnswers.push(answerToAdd);
      console.log(this.quizAnswers);
    },
  }
}
</script>


<style scoped>
#questionDiv{
  background-color: aqua;
  font-size: 80px;
}
#answerDiv{
  background-color: brown;
  font-size: 80px;
}
#nextButton{
  margin: 40px;
}
</style>