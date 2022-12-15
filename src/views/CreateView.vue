<template>
  <BannerComponent />
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
  <body>
  <div id="questionsCreated">
    <p> Scroll throught the questions of {{questionObject.id}}</p>
    <p style="font-weight: bold">Question {{questionIndex+1}}</p>
    <p>{{questionObject.questionArray}}</p>
    <p style="font-weight: bold">Answer</p>
    <p>{{questionObject.answerArray}}</p>
  </div>
  <div v-if="!addingQuestionBool">
    <h1>Name your quiz please</h1>
    <p><input class="qeustionEditingFields"  id="namingDeckField" type="text" v-model="deckName"></p>
    <p><button @click="nameDeck(deckName)">Name my deck</button></p> {{questionObject.id}}

  </div>

  <div v-if="addingQuestionBool">
    <h2 id="quizName">Now creating: {{questionObject.id}}</h2> {{questionIndex+1}}
    <h3> Add your questions</h3>
    <input class="qeustionEditingFields" id="questionField" type="text" v-model="questionField">{{questionField}}
    <br>
    <br>
    <input class="qeustionEditingFields"  id="answerField" type="text" v-model="answerField">{{answerField}}
    <div>
     <!-- <button @click="previousCLick"> Previous Question</button> -->
      <button @click="savingAddedQustion">Add this question and answer</button>
    </div>
  </div>



  <!--
  <div>
  <button @click="getDecks">Get Decks</button>

    <select v-model="selectedDeck" name="drinks" required>
      <option value="" disabled selected hidden>Choose a drink</option>
      <option v-for="drink in selectorList" v-bind:key="drink">{{ drink }}</option>
    </select> {{selectedDeck}}
    {{selectorList}}
  </div>

  <div>
    <header id="questionNumberHeader" v-if="!addingQuestionBool"> QUESTION {{questionIndex+1}} </header>
    <header id="questionNumberHeader" v-if="addingQuestionBool"> QUESTION TO ADD </header>
    <input class="qeustionEditingFields" id="questionField" type="text" v-model="questionField">
    {{questionField}}
    <br>
    <br>
    <input class="qeustionEditingFields"  id="answerField" type="text" v-model="answerField">
    {{answerField}}
  </div>

  <div>

    <button @click="loadDeck">Load deck</button>

    <button @click="addingNewQuestion">Add new question</button>

    <button @click="savingAddedQustion">Save the added question</button>
  </div>
  <div>
    <button @click="previousCLick" id="previousButton"> Previous </button> {{questionIndex}} <button @click="nextClick" id="nextButton"> Next </button>

    <br>
    <br>
    <button @click="savingCurrentQuestion" style="width: 200px; height: 150px">Save button</button>
  </div> -->

  <!--<div>
    <EditAndCreateComponent />
   
  </div> -->
 


  </body>

</template>


<script>
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
import BannerComponent from '@/components/BannerComponent.vue';
//import EditAndCreateComponent from "@/components/EditAndCreateComponent"; not using it
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
      selectedDeck: "",
      options: ["Mangoo", "Apple", "Orange", "Melon", "Pineapple", "Lecy", "Blueberry"],
      quizName: "",
      lang: "",
      pollId: "",
      questionIndex: 0,
      data: {},
      uiLabels: {},
      questionObject: {
        "id": "",
        "questionArray": [],
        "answerArray": []
      },
      answerButtonBool: false,
      questionField: "",
      answerField: "",
      deckName: "",
      quizQuestions: [],
      quizAnswers: [],
      selectorList: [],
      addingQuestionBool: false,
      //testingObject: JSON.parse(localStorage.getItem("daniel")),
      //completeDeck: {"id":this.deckName, "questionArray": this.quizQuestions, "answerArray":this.quizAnswers}
    }
  },
  components: {
    BannerComponent,
    //EditAndCreateComponent Not using it for now
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
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang})
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers})
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
    nameDeck: function (namingTheDeck) {
      console.log(namingTheDeck)
      this.deckName = namingTheDeck;
      this.questionObject.id = namingTheDeck;
      this.addingQuestionBool = true;
    },
    previousCLick: function () {
      if (this.questionIndex > 0) {
        this.questionIndex = this.questionIndex - 1;
      }
      this.answerField = this.questionObject.answerArray[this.questionIndex];
      this.questionField = this.questionObject.questionArray[this.questionIndex];
    },
    savingAddedQustion: function () {
      let question = this.questionField;
      let answer = this.answerField;
      console.log(question);
      console.log(answer);
      this.questionObject.questionArray.push(question);
      this.questionObject.answerArray.push(answer);
      console.log(this.questionObject);
      localStorage.setItem(this.questionObject.id, JSON.stringify(this.questionObject));
      this.questionField = "";
      this.answerField = "";
      this.questionIndex = this.questionIndex + 1;
    }
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
.qeustionEditingFields{
  font-size: 80px;
  text-align: center;
}

#questionNumberHeader{
  font-size: 80px;
  text-align: center;
  font-family: "Arial Black";
}

#quizName {
  font-size: 100px;
  text-align: center;
  font-family: "Arial Black";
}
#questionsCreated{
  text-align: right;
  font-size: 18px;
  margin: 40px;
}


</style>