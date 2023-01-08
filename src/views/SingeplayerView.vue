<template>
  
  <body>
    
    

  <div id="wrapperDiv">
    

      <div id="questionHeader">
        <div id="selector">
          <select  name="decks" v-model="selectedDeck" required @change="loadDeck(this.selectedDeck); $refs.myChild.resetQuestionPosition()">
            <option value="" disabled selected hidden>Choose your deck!</option>
            <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{ deck }}</option>
          </select>
        </div>
      </div>  
    </div>

    <div class="notActive" :class="{active:isActive}">
         
         {{ selectedDeck }}
       <br>
     
       </div>
    <div  id="centerDiv">
      <FlashcardView  v-bind:questionProp="myObj_deserialized"
                      v-bind:disable-click="clickableFlashcardBool"
                     ref="myChild"> </FlashcardView>

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
      numberToSend:0,
      isActive:false,
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
      fontSize: 80,
      clickableFlashcardBool: true,
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
       

    })
  },
  methods: {
    
    loadDeck: function(deck){
      this.isActive = false;
      console.log("du klickade på en knapp med loadDeck()");
      
      setTimeout (() => {
        this.questionObject = this.myObj_deserialized;
        this.myObj_deserialized = JSON.parse(localStorage.getItem(deck));
        this.isActive = true;
      },1);
      
      
      
    },
  },
}


</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;700&display=swap');

.notActive {
display: none;
}
.active {
  display: block;
}
#choosingParagraph{
  text-align: center;
  position: relative;
  font-size: 24px;
}

select {
  
  padding: 1em;
  width: 100%;
  border-radius: .2em;
  border: 1px solid #acacac;
  color: black;
  
  
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;

  background: url('https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/dropdown_arrow-512.png'); 
  background-color: transparent;
  background-repeat: no-repeat; 
  background-size: 15px 15px; 
  background-position: right;
  background-origin: content-box;
}

#wrapperDiv{
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  
  
}

header {
  
  width: 100%;
  display: grid;
  grid-template-columns: 2em auto;
}
#questionHeader{
  display: flex;
  justify-content: center;
  font-size:30px;
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  
  
  
}
#selector{
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  
  width: 200px;
  top: 0;
  
  
  
 
  
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

/*Adjusted for an Iphone 12 Pro screen*/
@media only screen and (max-width: 390px) {
  #wrapperDiv {
    visibility: visible;
  }

  #choosingParagraph{
    visibility: visible;
  }

  select {
    visibility: visible;
  }



  #wrapperDiv{
    visibility: visible;
  }

  header {
    visibility: visible;
  }
  #questionHeader{
    visibility: visible;
  }
  #selector{
    visibility: visible;
  }

  /*Reaction buttons*/
  button {
    visibility: visible;
  }
}
#centerDiv{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>