<template>

  <div class="card" v-on:click="flip" >
    <div class="card-inner" :class="{flipped: flipped}">
      <div class="card-front">
        <div >{{questionProp.questionArray[questionPosition]}}</div>
        
    </div>
    <div class="card-back">
      {{questionProp.answerArray[questionPosition]}}
    </div>

    </div>
    

  </div>


  <div>

    <!--<div id="count"> <p>
      Score:
    </p>  {{points}} out of {{questionProp.questionArray.length}} Points
    </div> -->
     

    

    <div class="buttonDiv">

      <button id="previousButton" @click="previousCLick" class="prevNextButton"> Previous </button>

      <a style="color:white">{{ questionPosition +1}}/{{questionProp.questionArray.length}}</a>
      <!--<input form="text" id="formInput" v-model="answerString">-->
      <button id="nextButton" @click="nextClick" class="prevNextButton"> Next </button>
      <!--<button id="nextButton" @click="textAnswer" class="prevNextButton"> Answer </button>  testade att skriva
      funktion som tar in text från input fältet och jämför med svar från arrayen. -->
      <!--<input type="range" min="10" max="100" v-model="fontSize" class="slider" id="myRange"> -->
    </div>


  </div>
</template>

<script>
export default {
  name: 'FlashcardView',
  props:['questionProp'],
  components: {
  },
  data: function(){
    return{
      flipped: false,
      answerButtonBool: false,
      fontSize: 80,
      questionPosition: 0,
      uiLabels: {},
      answerString: "",
      points: 0,
    }
  },
  methods: {
    flip(){
      this.flipped = !this.flipped;
    },
    questionPress: function() {
      this.answerButtonBool = true;
      this.adjustAnswerFontSize();
    },
    answerPress: function(){
      if(this.questionPosition < this.questionProp.questionArray.length - 1){
        this.questionPosition = this.questionPosition + 1;
        this.answerButtonBool = false;
        this.fontSize = 80;
        return;
      }
      console.log("this should only execute at last");
    },
    nextClick: function(){
      if(this.questionPosition < this.questionProp.questionArray.length - 1){
        this.questionPosition++;
        this.answerButtonBool = false;
        this.fontSize = 80;
        this.$emit('nextClick', this.questionPosition);

        if(this.areStringsSimilar(this.answerString, this.questionProp.answerArray[this.questionPosition-1])){
          console.log("correct");
          this.points++;
        }
        else{
          console.log("incorrect");
        }
        return;
      }
    },
    textAnswer: function(){
      let answer = this.answerString;
      let correctAnswer = this.questionProp.answerArray[this.questionPosition-1];
      if(this.questionPosition < this.questionProp.questionArray.length){
        this.answerButtonBool = true;
        setTimeout(() => {
          this.answerButtonBool = false;
          if(this.questionPosition < this.questionProp.questionArray.length-1){
            this.questionPosition++;
          }
        }, 2000);
        if(this.areStringsSimilar(answer, correctAnswer)){
          this.points++;
        }
        else{
          console.log("incorrect");
        }
      }
      return;
    },
    areStringsSimilar: function(input, correct) {
      if(input == ""){
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
    previousCLick: function(){
      if(this.questionPosition > 0){
        this.questionPosition--;
        this.$emit('previousClick', this.questionPosition);
      }
      this.fontSize = 80;
      this.answerButtonBool = false;
    },
    adjustAnswerFontSize: function() {
      const length = this.questionProp.answerArray[this.questionPosition].length;
      console.log(length);
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
  },
  watch: {
    /*questionProp: function() {
      this.questionPosition = 0;
      this.answerButtonBool = false;
    }*/
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

  
 
  
  perspective: 1000px; /* Remove this if you don't want the 3D effect */

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

#questionDiv{
  background-color: beige;
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.2);
}
#answerDiv{
  background-color: mediumspringgreen;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.2);
}
.flippingDivs{
  font-family: Roboto;
  margin-left: 5%;
  margin-right: 5%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#answerDiv:hover{
  animation: pulse 1s;
  transition: .3s;
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
.flippingDivParagraph{
  margin-left: 3%;
  margin-right: 3%;
  overflow-x: auto;
}
.flippingDivParagraph:hover{
  animation: pulse 1s;
  transition: .3s;
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