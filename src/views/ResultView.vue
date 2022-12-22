<template>
  <BannerComponent />
  <body>

  <div id="wrapperDiv">
    <div id="horizontalContent">

  <div id="questionHeader">

    <div id="selector">
   <!--   <select class="load-select" v-model="selectedDeck" name="drinks" required @change="loadDeck">
      <option value="" disabled selected hidden>Välj en frågelek</option>
      <option v-for="drink in selectorList" v-bind:key="drink">{{ drink }}</option>
    </select>-->
      <label id="choosingParagraph"> Choose a deck! </label>
        <select name="drinks" v-model="selectedDeck" required @change="loadDeck">
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;700&display=swap');

* { box-sizing: border-box; }

#choosingParagraph{
  font-size: 20px;
}
label {
  margin-top: 1.5em;
  margin-bottom: .5em;
  font-weight: bold;
  font-size: 1.2em;
}

select {
  padding: 1em;
  width: 130%;
  border-radius: .2em;
  border: 1px solid #acacac;
  color: #181820;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;

  background: url('https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/dropdown_arrow-512.png');
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: right;
  background-origin: content-box;
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
#selector{
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  position: absolute;
  width: 30%;
  top: 0;
  left: 15%;
  margin: 20px;
}
</style>