<template>
  <BannerComponent />
  <body>
  <div id="questionHeader">
    <select class="style-select" v-model="selectedDeck" name="drinks" required>
      <option value="" disabled selected hidden>Välj en frågelek</option>
      <option v-for="drink in selectorList" v-bind:key="drink">{{ drink }}</option>
    </select>    <button @click="loadDeck">Load deck</button>
    <p>
      {{questionObject.id}}
    </p>
  </div>
  <BarsComponent v-bind:data="submittedAnswers"/>
  <br>

  <div>

    <div class="flippingDivs" id="questionDiv" @click="questionPress" v-if="!answerButtonBool">
      <p :class="resizeText" :style="{'font-size': fontSize + 'px' }" class="flippingDivParagraph" > {{questionObject.questionArray[questionPosition]}} </p>
    </div>

    <Transition name="fade" v-bind:key="questionPosition">

      <div class="flippingDivs" id="answerDiv" @click="answerPress" v-if="answerButtonBool">
        <p :style="{'font-size': fontSize + 'px'}" class="flippingDivParagraph" > {{questionObject.answerArray[questionPosition]}} </p>
      </div>

    </Transition>

  </div>



  <div class="buttonDiv">
    <button @click="previousCLick" class="prevNextButton"> Previous </button> {{questionPosition}} <button @click="nextClick" class="prevNextButton"> Next </button>
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
      fontSize: 80
    }
  },
  /*computed: {
    resizeText: {
      get() {
        const length = this.questionObject.answerArray[this.questionPosition].length;
        console.log(length);
        if (length > 20) {
          return "smallText";
        } else if (length > 10) {
          return "mediumText";
        } else {
          return "largeText";
        }
      },
      set(value) {
        const length = this.questionObject.answerArray[this.questionPosition].length;
        if (length > 20) {
          this.fontSize = 20;
        } else if (length > 10) {
          this.fontSize = 30;
        } else {
          this.fontSize = 40;
        }
      },
    },
  },
  watch: {
  },*/ //försökte lösa justera fonten men gick inte som jag ville
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
      this.adjustAnswerFontSize();
    },
    answerPress: function(){
      this.answerButtonBool = false;
      this.fontSize = 80;
    },
    previousCLick: function(){
      if(this.questionPosition > 0){
        this.questionPosition = this.questionPosition - 1;
      }
      this.answerButtonBool = false;
    },
    nextClick: function(){
      if(this.questionPosition < this.questionObject.questionArray.length - 1){
        this.questionPosition = this.questionPosition + 1;
      }
      this.answerButtonBool = false;
      this.fontSize = 80;
    },
    loadDeck: function(){
      this.questionPosition = 0;
      console.log("du klickade på en knapp med loadDeck()")
      let myObj_deserialized = JSON.parse(localStorage.getItem(this.selectedDeck));
      console.log(myObj_deserialized);
      //this.questionObject = myObj_deserialized;
      //this.answerField = this.questionObject.answerArray[this.questionIndex];
      //this.questionField = this.questionObject.questionArray[this.questionIndex];
      this.questionObject = myObj_deserialized;
    },
    adjustAnswerFontSize: function(){
      const length = this.questionObject.answerArray[this.questionPosition].length;
      console.log(length);
      if (length > 100){
        this.fontSize = 20;
      }
      else if (length > 50){
        this.fontSize = 35;
      }
      else if(length < this.questionObject.questionArray[this.questionPosition].length){
        return;
      }
      else{
        this.fontSize = 80;
      }
    } //logiken fungerar, men känns upplagt för buggar aja.
  },
}
</script>


<style scoped>

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
  transition: all 2s ease;
}

.style-select{
  height: 40px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.flippingDivs{
  margin-left: 15%;
  margin-right: 15%;
}
.flippingDivParagraph {
}

#questionDiv{
  background-color: beige;
}
#answerDiv{
  background-color: mediumspringgreen;
}
.prevNextButton{
  margin-top: 30px;
  font-size: 80px;
  font-margin: 40px;
  margin-left: 180px;
  margin-right: 180px;
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

.buttonDiv{
  background-color: white;
}


</style>