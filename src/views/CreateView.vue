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

  <div>
    <EditAndCreateComponent />
   
  </div>

-->
 


  </body>

</template>


<script>
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
import BannerComponent from '@/components/BannerComponent.vue';
import EditAndCreateComponent from "@/components/EditAndCreateComponent";
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
      question: "",
      answers: ["", ""],
      questionIndex: 0,
      data: {},
      uiLabels: {},
      questionObject: {
        "id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]
      }, //Nu gjorde vi om så att objektet inte är i en lista, fungerar
      //att hämta från singulär objekt.
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
    EditAndCreateComponent
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
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
    saveDeck: function () {
      console.log("du klickade på en knapp med say()")
      let completeDeck = {"id": this.deckName, "questionArray": this.quizQuestions, "answerArray": this.quizAnswers};
      //defined on render. Inte bra vet inte varför.
      console.log(completeDeck);
      localStorage.setItem(completeDeck.id, JSON.stringify(completeDeck));
    },
    getDecks: function () {
      let listToFill = [];
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        listToFill.push(localStorage.key(i));
      }
      this.selectorList = listToFill;
      //this.answerField = this.questionObject.answerArray[this.questionIndex];
      //this.questionField = this.questionObject.questionArray[this.questionIndex];
    },
    nameDeck: function (namingTheDeck) {
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
    questionsToDeck: function (questionToAdd) {
      this.quizQuestions.push(questionToAdd);
      console.log(this.quizQuestions);
      //console.log(this.quizQuestions);
      //let myObj_deserialized = JSON.parse(localStorage.getItem(namingTheDeck));
      //console.log(myObj_deserialized);
    },
    answersToDeck: function (answerToAdd) {
      this.quizAnswers.push(answerToAdd);
      console.log(this.quizAnswers);
    },
    loadDeck: function () {
      console.log("du klickade på en knapp med loadDeck()")
      let myObj_deserialized = JSON.parse(localStorage.getItem(this.selectedDeck));
      console.log(myObj_deserialized);
      //this.questionObject = myObj_deserialized;
      //this.answerField = this.questionObject.answerArray[this.questionIndex];
      //this.questionField = this.questionObject.questionArray[this.questionIndex];
      this.answerField = myObj_deserialized.answerArray[this.questionIndex];
      this.questionField = myObj_deserialized.questionArray[this.questionIndex];
      this.questionObject = myObj_deserialized;
    },
    previousCLick: function () {
      if (this.questionIndex > 0) {
        this.questionIndex = this.questionIndex - 1;
      }
      this.answerField = this.questionObject.answerArray[this.questionIndex];
      this.questionField = this.questionObject.questionArray[this.questionIndex];
    },
    nextClick: function () {
      if (this.questionIndex < this.questionObject.questionArray.length - 1) {
        this.questionIndex = this.questionIndex + 1;
      }
      this.answerField = this.questionObject.answerArray[this.questionIndex];
      this.questionField = this.questionObject.questionArray[this.questionIndex];
    },
    savingCurrentQuestion: function () {
      let question = this.questionField;
      let answer = this.answerField;
      console.log(question);
      console.log(answer);
      this.questionObject.questionArray[this.questionIndex] = question;
      this.questionObject.answerArray[this.questionIndex] = answer;
      localStorage.setItem(this.questionObject.id, JSON.stringify(this.questionObject));
    }, //detta fungerar men känns jätteupplagt för bugggar. Vi får hålla koll på detta.
    addingNewQuestion: function () {
      this.questionIndex = this.questionObject.questionArray.length;
      this.questionField = "";
      this.answerField = "";
      this.addingQuestionBool = true;
    },
    savingAddedQustion: function () {
      let question = this.questionField;
      let answer = this.answerField;
      console.log(question);
      console.log(answer);
      this.questionObject.questionArray.push(question);
      this.questionObject.answerArray.push(answer);
      localStorage.setItem(this.questionObject.id, JSON.stringify(this.questionObject));
      this.addingQuestionBool = false;
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
</style>