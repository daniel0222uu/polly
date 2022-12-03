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
    </form>
  </div>
  <div>
    <form>
      <input type="text" v-model="questionField">
      {{questionField}}
      <button @click="questionsToDeck(questionField)"> add question
      </button>
      <br>
      <input type="text" v-model="answerField">
      {{answerField}}
      <button @click="answersToDeck(answerField)"> answer to question
      </button>
    </form>
  </div>

  <br>
  <br>
  <br>

  <div>
    <form>
      <button @click="say" >Klar</button> Är du klar med din quiz? Klicka på knappen
    </form>
  </div>


  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <div id="questionDiv" @click="questionPress" v-if="answerButtonBool==false">
    {{questionObject.questionArray[questionPosition]}}
  </div>
  <div id="answerDiv" @click="answerPress" v-if="answerButtonBool==true">
  {{questionObject.answerArray[questionPosition]}}
  </div>

  <div>
    <button @click="previousCLick" id="previousButton"> Previous </button> {{questionPosition}} <button @click="nextClick" id="nextButton"> Next </button>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
const socket = io();



let testObj = JSON.stringify(Decks);
localStorage.setItem("theDeckObject", testObj)
//console.log(testObj);
let myObj_deserialized = JSON.parse(localStorage.getItem("theDeckObject"));
console.log(myObj_deserialized);




export default {
  name: 'CreateView',
  data: function () {
    return {
      quizName: "",
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      questionObject: {"id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]},
      questionPosition: 0,
      answerButtonBool: false,
      questionField: "",
      answerField: "",
      quizQuestions: [],
      quizAnswers: []
    }
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
    questionPress: function(){
      this.answerButtonBool = true;
      console.log("du clickade på knappen")
    },
    answerPress: function(){
      this.answerButtonBool = false;
    },
    previousCLick: function(){
      if (this.questionPosition>0) {
        --this.questionPosition;
        this.answerButtonBool = false;
      }
    },
    nextClick: function(){
      if (this.questionPosition < 3) {
        ++this.questionPosition;
        this.answerButtonBool = false;
      }
    },
    say: function(){
      console.log("du klickade på en knapp med say()")
    },
    nameDeck: function(namingTheDeck){
      let id = "'id'" +":" + "'" + namingTheDeck + "'" + ",\n";
      console.log(id)
      localStorage.setItem(namingTheDeck, id)
      //let myObj_deserialized = JSON.parse(localStorage.getItem(namingTheDeck));
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