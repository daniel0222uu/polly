<template>
  
  <body>


  <div id="wrapperDiv">
    
    <div id="horizontalContent">
      
      <div id="questionHeader">
        <div id="selector">
          <select  name="decks" v-model="selectedDeck" required @change="loadDeck(this.selectedDeck)">
            <option value="" disabled selected hidden>{{selectorList[0]}}</option>
            <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{ deck }}</option>
          </select>
        </div>
        <FlashcardView v-bind:questionProp="myObj_deserialized" v-bind:questionIndex="questionPosition"> </FlashcardView>
      </div>
      {{ selectedDeck }}

    </div>

   
  </div>

  </body>
</template>

<script>
// @ is an alias to /src
// import BarsComponent from '@/components/BarsComponent.vue';
import FlashcardView from "@/components/FlashcardComponent";
import io from 'socket.io-client';

const socket = io();

export default {
  name: 'ResultView',
  components: {
    FlashcardView,
    // BarsComponent
  },
  data: function () {
    return {
      myObj_deserialized: {},
      uiLabels: {},
      lang: "en",
      hideNav: true,
      selectorList: [],
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
    for (var i =0, len = localStorage.length; i< len; ++i ) 
    {
       this.selectorList.push(localStorage.key(i));
    }
    this.myObj_deserialized = this.questionObject;

    socket.on("init", (labels) => {
      this.uiLabels = labels
      console.log(labels);
       this.loadDeck(this.selectorList[0])

    })
  },
  methods: {
    loadDeck: function(deck){
      this.questionPosition = 0;
      console.log("du klickade på en knapp med loadDeck()");
      this.myObj_deserialized = JSON.parse(localStorage.getItem(deck));
      this.questionObject = this.myObj_deserialized;
    },
  },
}


</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;700&display=swap');



#choosingParagraph{
  text-align: center;
  position: relative;
  font-size: 24px;
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
  font-size:30px;
  padding-top: 100px;
  text-align: center;
}
#selector{
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  position: absolute;
  width: 30%;
  top: 0;
  left: 20%;
  margin-top: 10px;
}

/*Reaction buttons*/
button {
  padding: 10px 40px;
  cursor: pointer;
  font-family: 'Kanit', sans-serif;
  font-size: 20px;
  opacity: 1;
  border-radius: 20px;
  border: white ;
}

/*
#Likes {
  padding: 10px 40px;
}

#Comments{
  padding: 10px 40px;
}


Popup button
.popup{
  width: 400px;
  background-color: black;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  padding: 0 30px 30px;
}

.popup h2 {
  font-size: 38px;
  font-weight: 500;
  margin: 30px 0 10px;
}

.popup button{
  width: 100%;
  margin-top: 50px;
  padding: 10px 0;
  border: 0;
  outline: none;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
}*/


</style>