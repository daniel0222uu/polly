<template>
  <BannerComponent />
  <body>

  <div v-if="!addingQuestionBool">

    <h1>Name your quiz please</h1>
    <p><input class="qeustionEditingFields"  id="namingDeckField" type="text" v-model="deckName"></p>
    <p><button @click="nameDeck(deckName)">Name my deck</button></p> {{questionObject.id}}

  </div>

  <div id="nowCreating" v-if="addingQuestionBool">
    <div id="quizName"> Now creating: {{questionObject.id}}

    </div>
    <h3> Add your questions</h3>
    <input class="qeustionEditingFields" id="questionField" type="text" v-model="questionField">
    <br>
    <br>
    <input class="qeustionEditingFields"  id="answerField" type="text" v-model="answerField">

     <!-- <button @click="previousCLick"> Previous Question</button> -->
    <button @click="savingAddedQustion">Add this question and answer</button>

  </div>

  <!--<div id="questionsCreated">
    <p> Scroll throught the questions of {{questionObject.id}}</p>
    <p style="font-weight: bold">Question {{questionIndex+1}}</p>
    <p>{{questionObject.questionArray[questionIndex]}}</p>
    <p style="font-weight: bold">Answer to question</p>
    <p>{{questionObject.answerArray[questionIndex]}}</p>
    <p> <button @click="previousCLick" > Previous</button>  <button @click="nextClick"> Next</button>   </p>
  </div>-->


  <transition name="fade">
    <div id="questionWasAddedDiv" v-if="questionWasAdded"  > The question was added </div>
  </transition>


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
      questionWasAdded: false,
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
    nextClick: function(){
      let initializeQarrayLength = this.questionObject.questionArray.length
      if (this.questionIndex<initializeQarrayLength-1){
        this.questionIndex++
      }
      console.log(this.questionIndex)
    },
    previousCLick: function () {
      if (this.questionIndex > 0) {
        this.questionIndex--
      }
      console.log(this.questionIndex)
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
      this.questionWasAdded = true;
      setTimeout(() => {
        this.questionWasAdded = false;
      }, 2000);
    }
  }
}
</script>

<style scoped>

#questionWasAddedDiv{
  font-size: 40px;
  background-color: mediumspringgreen;
  margin-top: 20px;
  margin-left: 300px;
  margin-right: 300px;
}
#nowCreating{
  width: auto;
}
#questionsCreated{
  margin-top: 300px;
  display: block;
  text-align: left;
  padding: 10px;
  font-size: 18px;
  position: fixed;
  float: right;
  height: 100%;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition: all 2s ease;
}
.fade-leave-from{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
}
.fade-leave-active{
  transition: all 0.5s ease;
}



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
  position: relative;
  font-size: 40px;
  font-size-adjust:0.5;
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





</style>