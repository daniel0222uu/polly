<template>
  <div>
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
  </div>

  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <div id="questionDiv" @click="questionPress" v-if="answerButtonBool==false">
    {{questionArray[questionPosition]}}
  </div>
  <div id="answerDiv" @click="answerPress" v-if="answerButtonBool==true">
  {{answerArray[questionPosition]}}
  </div>

  <div>
    <button @click="previousCLick" id="previousButton"> Previous </button> {{questionPosition}} <button @click="nextClick" id="nextButton"> Next </button>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();


//var questionArray = ["Sverige", "Norge", "Finland", "Danmark"];
//var answerArray   = ["Sthlm", "Oslo", "Helsingfors", "CBH"];



export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      questionArray: ["Sverige", "Norge", "Finland", "Danmark"],
      answerArray: ["Sthlm", "Oslo", "Helsingfors", "CBH"],
      questionPosition: 0,
      answerButtonBool: false,
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
      --this.questionPosition;
    },
    nextClick: function(){
      ++this.questionPosition;
    }
  }
}
</script>


<style scoped>

#questionDiv{
  background-color: aqua;
}

#answerDiv{
  background-color: brown;
}

#nextButton{
  margin: 40px;
}

</style>