<template>
  <div id="cardsDiv" >

    <!--<div id="count"> <p>
      Score:
    </p>  {{points}} out of {{questionProp.questionArray.length}} Points
    </div> -->
     <div class="flippingDivs" id="questionDiv" @click="questionPress" v-if="!answerButtonBool">
      <p :class="resizeText" :style="{'font-size': fontSize + 'px' }" class="flippingDivParagraph" > {{questionProp.questionArray[questionPosition]}} </p>
    </div>

    <Transition name="fade" v-bind:key="questionPosition">

      <div class="flippingDivs" id="answerDiv" @click="answerPress" v-if="answerButtonBool">
        <p :style="{'font-size': fontSize + 'px'}" class="flippingDivParagraph" > {{questionProp.answerArray[questionPosition]}} </p>
      </div>
    </Transition>

    <div class="buttonDiv">

      <button id="previousButton" @click="previousCLick" class="prevNextButton"> Previous </button>
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
  name: "FlashcardView",
  props:['questionProp'],
  components: {
  },
  data: function(){
    return{
      answerButtonBool: false,
      fontSize: 80,
      questionPosition: 0,
      uiLabels: {},
      answerString: "",
      points: 0,
    }
  },
  methods: {
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
  font-size: 30px;
  font-margin: 40px;
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
  justify-content: space-between;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
}
#previousButton {
  border: none;
  padding-top: 10px;
  padding-bottom: 10px;
  color: black;
  font-weight: 900;
  font-Size: 25px;
  width: 250px;
  height: 80px;
  margin-bottom: 5px;
  border-radius: 50px;
}
#nextButton {
  border: none;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 900;
  font-Size: 25px;
  width: 250px;
  height: 80px;
  margin-bottom: 5px;
  border-radius: 50px;
}
#previousButton:hover {
  opacity: 1;
  -webkit-animation: flash 3s;
  animation: flash 3s;
}
#nextButton:hover {
  opacity: 1;
  -webkit-animation: flash 1.5s;
  animation: flash 1.5s;
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