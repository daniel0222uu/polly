<template>

  <div class="card"  v-on:click="flip">
    <div class="card-inner" :class="{flipped: flipped}">
      <div :style="{'font-size': fontSize + 'px' }" class="card-front">
        <div >{{questionProp.questionArray[questionPosition]}}</div>
        
    </div>
    <div :style="{'font-size': fontSize + 'px' }" class="card-back">
      {{questionProp.answerArray[questionPosition]}}
    </div>

    </div>
    

  </div>


 




    <div class="buttonDiv" v-if="!coopMultiplayer">

      <button id="previousButton" @click="previousCLick" class="prevNextButton"> Previous </button>

      <a style="color:white">{{ questionPosition+1}}/{{questionProp.questionArray.length}}</a>
      <!--<input form="text" id="formInput" v-model="answerString">-->
      <button id="nextButton" @click="nextClick" class="prevNextButton"> Next </button>
      <!--<button id="nextButton" @click="textAnswer" class="prevNextButton"> Answer </button>  testade att skriva
      funktion som tar in text från input fältet och jämför med svar från arrayen. -->
      <!--<input type="range" min="10" max="100" v-model="fontSize" class="slider" id="myRange"> -->
    </div>


</template>

<script>


import io from 'socket.io-client';
const socket = io();  

export default {
  name: 'FlashcardView',
  props: ['questionProp','showAnswer','pollId','coopMultiplayer','deckLoaded','disableClick'],
  components: {},
  data: function () {
    return {
      hej:0,
      flipped: false,
      answerButtonBool: false,
      fontSize: 80,
      questionPosition :0,
      uiLabels: {},
      answerString: "",
      points: 0,
    }
  },
  
  methods: {

   resetQuestionPosition() {
      this.questionPosition = 0;
      this.flipped = false;
    },
    flip() {
     if(!this.disableClick){
       return;
     }
      this.flipped = !this.flipped;
      this.adjustAnswerFontSize();
    },
    nextClick: function () {
      if (this.questionPosition < this.questionProp.questionArray.length - 1) {
        this.flipped = false;
        this.questionPosition++;
        this.fontSize = 80;
        this.$emit('nextClick', this.questionPosition);
      
        
        

        if (this.areStringsSimilar(this.answerString, this.questionProp.answerArray[this.questionPosition - 1])) {
          console.log("correct");
          this.points++;
        } else {
          console.log("incorrect");
        }
        return;
      }
    },
    textAnswer: function () {
      let answer = this.answerString;
      let correctAnswer = this.questionProp.answerArray[this.questionPosition - 1];
      if (this.questionPosition < this.questionProp.questionArray.length) {
        this.answerButtonBool = true;
        setTimeout(() => {
          this.answerButtonBool = false;
          if (this.questionPosition < this.questionProp.questionArray.length - 1) {
            this.questionPosition++;
          }
        }, 2000);
        if (this.areStringsSimilar(answer, correctAnswer)) {
          this.points++;
        } else {
          console.log("incorrect");
        }
      }
      return;
    },
    areStringsSimilar: function (input, correct) {
      if (input == "") {
        return false;
      }
      input = input.toLowerCase();
      correct = correct.toLowerCase();
      console.log(input);
      console.log(correct);
      let numDifferences = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== correct[i]) {
          numDifferences++;
        }
        if (numDifferences > 2) {
          return false;
        }
      }
      return true;
    },
    previousCLick: function () {
      if (this.questionPosition > 0) {
        this.questionPosition--;
        this.$emit('previousClick', this.questionPosition);
      }
      this.fontSize = 80;
      this.answerButtonBool = false;
    },
    adjustAnswerFontSize: function () {
      if(this.flipped){
        console.log("now we should only show the answer")
        const length = this.questionProp.answerArray[this.questionPosition].length;
        if (length > 100) {
          this.fontSize = 20;
        } else if (length > 50) {
          this.fontSize = 50;
        } else if (length > 20) {
          this.fontSize = 60;
        } else if (length > 15) {
          this.fontSize = 70;
        } else if (length < this.questionProp.questionArray[this.questionPosition].length) {
          return;
        } else {
          this.fontSize = 80;
        }
      }
      if(!this.flipped){
        setTimeout(() => this.fontSize = 80, 500);
      }
    },
  },
  watch: {
    showAnswer: function () {
      if (this.showAnswer) {
        console.log("showAnswer changed because flipped is:", this.flipped);
        this.flipped = true;
        setTimeout(() => this.flipped = false, 2000);
        setTimeout(() => this.nextClick(), 3000);
        setTimeout(() => socket.emit('questionSeen', {pollId: this.pollId}), 3500);
      }
    },
    deckLoaded: function () {
      this.resetQuestionPosition();
      console.log("deckLoaded changed, questionPosition is now:", this.questionPosition);
    }
  }
}
</script>

<style scoped>

.card {
  margin-left: 35%;
  margin-right: 35%;
  height:400px; 
  display: flex;
  justify-content: center;
  cursor:pointer;
  align-items: center;
  perspective: 1000px;
}
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1.2s;
  transform-style: preserve-3d;
}
.card-inner.flipped{
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 10px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  backface-visibility: hidden;
  border: 2px solid black;
  background-color: rgb(74, 91, 205);
}
.card-front {
  color: black;
  font-size: 18px;
  background-color: rgb(32, 159, 178);
  
}
.card-back {
  font-size: 14px;
  color: white;
  transform: rotateY(180deg);
  background-color: rgb(74, 91, 205);
}
#count{
  font-size: 30px;
}
#formInput{
  width: 300px;
  font-size: 24px;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(.9);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(.9);
  }
  100% {
    transform: scale(1);
  }
}
.prevNextButton{
  font-size: 10px;
 
}
.buttonDiv{
  display: flex;

  justify-content: center;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
}

#nextButton, #previousButton {
  border: none;
  
  cursor:pointer;
 
  font-Size: 2vmax;
  width: 12vmax;
  height: 4vmax;
  
  border-radius: 5px;
}
#previousButton:active {
transform: translateX(-2px);
}
#nextButton:active {
  transform: translateX(2px);
}
#nextButton:hover, #previousButton:hover{
  background-color: lightgray;
}
@-webkit-keyframes flash {
  0% {
    opacity: .4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes flash {
  0% {
    opacity: .4;
  }
  100% {
    opacity: 1;
  }
}
</style>