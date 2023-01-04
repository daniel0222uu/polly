<template>
  <body>
    <WarningMessage v-bind:deck-alert="deckNameAlert"  v-bind:question-field-alert="questionFieldAlert"
    v-bind:question-was-added="questionWasAdded"/>
    <div class="horizontalDiv" v-if="!addingQuestionBool">

      <p id="namingQuiz">Name your quiz please</p>

      <div id="namingField" ><input class="qeustionEditingFields"  id="namingDeckField" type="text" v-model="deckName"></div>
      <p><button @click="nameDeck(deckName)">Name my deck</button></p> {{questionObject.id}}
    </div>

  <div id="wrapperDiv">

    <div id="questionList">

      <p>
        Added questions
      </p>
      <ul>
        <li v-for="item in questionObject.questionArray" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="horizontalDiv" v-if="addingQuestionBool">



      <h2>Now creating: {{questionObject.id}} </h2>

      <p>Add your questions</p>
      <input class="qeustionEditingFields" id="questionField" type="text" v-model="questionField">
      <br>
      <input class="qeustionEditingFields"  id="answerField" type="text" v-model="answerField">
      <p><button @click="savingAddedQustion">Add this question and answer</button> </p>
    </div>


    <div v-if="addingQuestionBool" id="verticalDiv">


      <div id="questionShowing">

        <p style="font-weight: bold">{{questionObject.questionArray[questionIndex]}}</p>
        <p>{{questionObject.answerArray[questionIndex]}}</p>
        <p> <button @click="previousCLick" type="submit" style="margin-right: 70px">
          <img src="https://cdn-icons-png.flaticon.com/512/7693/7693294.png" style="width: 20px">
        </button>
          <button @click="nextClick" >
            <img src="https://cdn-icons-png.flaticon.com/512/7693/7693290.png" style="width: 20px">
          </button>
        </p>

      </div>



    </div>


  </div>






  </body>

</template>


<script>
import io from 'socket.io-client';
import Decks from "../assetts/Decks.json";
import WarningMessage from "@/components/WarningMessage";
const socket = io();
console.log(Decks);



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
      deckNameAlert: false,
      questionFieldAlert: false
      //testingObject: JSON.parse(localStorage.getItem("daniel")),
      //completeDeck: {"id":this.deckName, "questionArray": this.quizQuestions, "answerArray":this.quizAnswers}
    }
  },
  components: {
    WarningMessage
    
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
      if (namingTheDeck === "") {
        console.log("Please name your deck");
        this.deckAlert();
        return;
      }
      console.log(namingTheDeck)
      this.deckName = namingTheDeck;
      this.questionObject.id = namingTheDeck;
      this.addingQuestionBool = true;
    },
    nextClick: function () {
      let initializeQarrayLength = this.questionObject.questionArray.length
      if (this.questionIndex < initializeQarrayLength - 1) {
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
      if (question === "" || answer === "") {
        console.log("Please fill in both fields")
        this.fieldAlert()
        return;
      }
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
    },
    deckAlert(){
      this.deckNameAlert = true;
      setTimeout(() => {
        this.deckNameAlert = false;
      }, 2000);
    },
    fieldAlert(){
      this.questionFieldAlert = true;
      setTimeout(() => {
        this.questionFieldAlert = false;
      }, 2000);
    },
  },

}
</script>

<style scoped>
#wrapperDiv{
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
  overflow: auto;
}
.horizontalDiv{
}
#verticalDiv{
  border: 2px solid black;
  margin-right: 3%;
}
#questionShowing{
}
#questionList{
  margin-left: 3%;
  max-width: 100px;
  overflow: auto;
  position: relative;
}
.qeustionEditingFields{
  margin: 5px;
  font-size: 20px;
  font-size-adjust:0.5;
  margin-left: 5%;
  position: relative;
  text-align: center;
}
#namingQuiz{
  margin: 5px;
  position: relative;
  font-size: 40px;
  font-size-adjust:0.5;
  text-align: center;
}
#namingField{
  
}
</style>