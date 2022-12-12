<template>
  <body id="wholeSite">
  <div id="questionHeader">
    {{questionObject.id}}
  </div>
  <BarsComponent v-bind:data="submittedAnswers"/>
  <br>
  <div>
    <select v-model="selectedDeck" name="drinks" required>
      <option value="" disabled selected hidden>Choose a drink</option>
      <option v-for="drink in selectorList" v-bind:key="drink">{{ drink }}</option>
      <!--  <option v-for="fraga in selectorList" :value="fraga">{{ fraga.id }}<option> -->
    </select> {{selectedDeck}}
    {{selectorList}}
    <button @click="loadDeck">Load deck</button>
  </div>

  <div id="questionDiv" @click="questionPress" v-if="answerButtonBool==false">
    {{questionObject.questionArray[questionPosition]}}
  </div>

  <div id="answerDiv" @click="answerPress" v-if="answerButtonBool==true">
    {{questionObject.answerArray[questionPosition]}}
  </div>
  <div>
    <button @click="previousCLick" id="previousButton"> Previous </button> {{questionPosition}} <button @click="nextClick" id="nextButton"> Next </button>
  </div>
  </body>
</template>

<script>
// @ is an alias to /src
import BarsComponent from '@/components/BarsComponent.vue';
import io from 'socket.io-client';
const socket = io();

let listToFill = [];
for (var i =0, len = localStorage.length; i< len; ++i ) {
  listToFill.push(localStorage.key(i));
}

export default {
  name: 'ResultView',
  components: {
    BarsComponent
  },
  data: function () {
    return {
      selectorList:listToFill,
      selectedDeck: "",
      question: "",
      submittedAnswers: {
      },
      questionObject:   {"id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]},
      answerButtonBool: false,
      questionPosition: 0,


    }
  },
  methods: {
    questionPress: function(){
      this.answerButtonBool = true;
    },
    answerPress: function(){
      this.answerButtonBool = false;
    },
    previousCLick: function(){
      if(this.questionPosition > 0){
        this.questionPosition = this.questionPosition - 1;
      }
    },
    nextClick: function(){
      if(this.questionPosition < this.questionObject.questionArray.length - 1){
        this.questionPosition = this.questionPosition + 1;
      }
      this.answerButtonBool = false;
    },
    loadDeck: function(){
      console.log("du klickade på en knapp med loadDeck()")
      let myObj_deserialized = JSON.parse(localStorage.getItem(this.selectedDeck));
      console.log(myObj_deserialized);
      //this.questionObject = myObj_deserialized;
      //this.answerField = this.questionObject.answerArray[this.questionIndex];
      //this.questionField = this.questionObject.questionArray[this.questionIndex];
      this.questionObject = myObj_deserialized;
    },
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.submittedAnswers = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  }
}
</script>


<style scoped>
#questionDiv{
  background-color: aqua;
  font-size: 160px;
  margin-left: 180px;
  margin-right: 180px
}
#answerDiv{
  background-color: brown;
  font-size: 160px;
  margin-left: 180px;
  margin-right: 180px
}
#nextButton{
  margin: 40px;
}
#questionHeader{
  text-transform: uppercase;
  font-weight: bold;
  font-size: 30px;
  padding-top: 100px;
  margin-left: 180px;
  margin-right: 180px;
  text-align: center;
}
</style>