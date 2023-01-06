<template>
  <body>
    <!--
      Saker att fixa: 

      Namnen måste vara unika, det får alltså inte finnas två deck med identiska namn.


    -->
    <WarningMessage v-bind:deck-alert="deckNameAlert"  v-bind:question-field-alert="questionFieldAlert"
    v-bind:question-was-added="questionWasAdded"/>
    <div class="firstView" :class="{notActive: deckIsNamed}">


        
        <input style="padding:5px; margin:5px;" placeholder="Name your deck here" id="namingDeckField" type="text" v-model="deckName">
      
      <button style="padding:5px; margin:5px;" @click="nameDeck(deckName)">Create new deck</button> {{questionObject.id}}
    </div>



    
    <div :class="{notActive: !deckIsNamed}">

      <div id="wrapperDiv">

        
        <h2>{{questionObject.id}} </h2>
        <div class="horizontalDiv">

          <div id="questionList" >

                 <ol>
                   <li  v-for="item in questionObject.questionArray" :key="item">{{ item }}</li>
                 </ol>
             </div>

          <div id="inputFields">
             

            
          <input class="questionEditingFields" type="text" placeholder="Question"  v-model="questionField">
           <br>
           <textarea class="questionEditingFields"  placeholder="Answer" v-model="answerField"></textarea>

           <button id="buttonPosition" @click="savingAddedQustion">Add card</button>

          </div>

        

        </div>

      </div>
<!--

<div id="questionShowing">
        <p >{{questionObject.questionArray[questionIndex]}}</p>
        <p>{{questionObject.answerArray[questionIndex]}}</p>
        <p>
           <button @click="previousCLick" type="submit" style="margin-right: 70px">
           <img src="https://cdn-icons-png.flaticon.com/512/7693/7693294.png" style="width: 20px">
            </button>
           <button @click="nextClick" >
            <img src="https://cdn-icons-png.flaticon.com/512/7693/7693290.png" style="width: 20px">
           </button>
         </p>

      </div>

-->
      
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
      deckIsNamed: false,
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
      this.deckIsNamed = true;
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

ol {
  list-style-type: upper-roman;
  border-left: 2px dotted black;
  font-size: 20px;
  
  
  overflow: hidden;
 
  
}

.questionEditingFields:focus::placeholder {
  color: transparent;
}
#createButton {
 text-decoration: none;
 color: black;
 cursor:default;
 
}
#saveButtonDiv{
  
  
  
  
}

#inputFields {
grid-column: 3;

width: 300px;


 
}


.firstView {
  margin-top:5%;
}
.horizontalDiv{
  display: grid;
  grid-template-columns: repeat(5, 20%);
  
 
}

.notActive {
  display:none;

}
#buttonPosition {
  width: 90%;
  height: 30%;
}
#questionList{
  
 grid-column: 2;
 
 
  
}
.questionEditingFields{
  width: 90%;
  height: 40px;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  
  
}
#namingField {
 
 
}
#namingQuiz{
  margin: 5px;
  position: relative;
  font-size: 40px;
  font-size-adjust:0.5;
  text-align: center;
}
@media screen and (max-width:40em) {
  .horizontalDiv {
display:flex;
align-items: center;
flex-direction: column-reverse;


  }
  #questionList {
    margin-top:100px;
    
  color:white;
    max-width: 300px;
  }
  .firstView {
  margin-top:none;
}
#buttonPosition {
  width: 90%;
  height: 50px;
}

}



</style>