<template>
  <BannerComponent />
  <body>

  <div id="wrapperDiv">
    <div id="horizontalContent">
  <div id="questionHeader">





    <div id="selectDeck">
      <select class="load-select" v-model="selectedDeck" name="drinks" required @change="loadDeck">
      <option value="" disabled selected hidden>Välj en frågelek</option>
      <option v-for="drink in selectorList" v-bind:key="drink">{{ drink }}</option>
    </select>
    </div>


  </div>
  <BarsComponent v-bind:data="submittedAnswers"/>

  <div id="cardsDiv" >
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
    <button @click="previousCLick" class="prevNextButton"> Previous </button> <button @click="nextClick" class="prevNextButton"> Next </button>
  </div>
    </div>

    <div id="verticalRight">
      här ska det vara aktiva spelare och möjlighet till att kunna gå med i lobbies. Ska såklart inte va
      såhär fult grön men aa hoppas man fattar layout
    </div>
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
console.log(listToFill);

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
      selectorList: listToFill,
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
      if(this.questionPosition < this.questionObject.questionArray.length - 1){
        this.questionPosition = this.questionPosition + 1;
      }
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

#horizontalContent{
  flex: 1;
  overflow: auto;
}
#verticalRight{
  background-color: palegreen;
  width: 33%;
}

#wrapperDiv{
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
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
  margin-left: 5%;
  margin-right: 5%;
}
.flippingDivParagraph {
}

#questionDiv{
  background-color: beige;
}
#answerDiv{
  background-color: mediumspringgreen;
}


header {
  background-color: gray;
  width: 100%;
  display: grid;
  grid-template-columns: 2em auto;
}
#questionHeader{
  text-transform: uppercase;
  font-weight: bold;
  font-size: 30px;
  padding-top: 100px;
  text-align: center;
}
#cardsDiv{
}
.prevNextButton{
  font-size: 30px;
  font-margin: 40px;
}

.buttonDiv{
}
#chooseDeckDiv{
  font-size: 20px;
  padding: 20px;
}
.load-button {
  background-color: blue;
  color: white;
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
#selectDeck{
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
}
.load-select {
  background-color: rgba(255, 255, 255, 0.5);
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>