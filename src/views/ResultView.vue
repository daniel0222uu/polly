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
      <div>
        <FlashcardView v-bind:questionProp="myObj_deserialized"></FlashcardView>
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
import FlashcardView from "@/views/FlashcardView";
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
    FlashcardView,
    BannerComponent,
    BarsComponent
  },
  data: function () {
    return {
      myObj_deserialized: {},
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
      fontSize: 80,
    }
  },
  created() {
    this.myObj_deserialized = this.questionObject;
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
    loadDeck: function(){
      this.questionPosition = 0;
      console.log("du klickade på en knapp med loadDeck()");
      this.myObj_deserialized = JSON.parse(localStorage.getItem(this.selectedDeck));
      this.questionObject = this.myObj_deserialized;
    },
  },
}
</script>


<style scoped>
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