<template>
  <BannerComponent />
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
import BannerComponent from '@/components/BannerComponent.vue';
import io from 'socket.io-client';
const socket = io();

let listToFill = [];
for (var i =0, len = localStorage.length; i< len; ++i ) {
  listToFill.push(localStorage.key(i));
}

export default {
  name: 'ResultView',
  components: {
    BannerComponent,
    BarsComponent
  },
  data: function () {
    return {
      uiLabels: {},
      lang: "en",
      hideNav: true,
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
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    },
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
  /*created: function () {
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
  }*/
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
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

header {
  background-color: gray;
  width: 100%;
  display: grid;
  grid-template-columns: 2em auto;
}
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
.hamburger {
  color:white;
  width:1em;
  display: flex;
  align-items: center;
  justify-content: left;
  padding:0.5rem;
  top:0;
  left:0;
  height: 2rem;
  cursor: pointer;
  font-size: 1.5rem;
}

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
}
</style>