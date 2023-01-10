<template>
<div class="playDiv">
  <div class="card"  >
    <div class="card-inner" v-on:click="flip" :class="{flipped: flipped}">
      <div :style="{'font-size': adjustingFontSizeQuestion + 'px' }" class="card-front">
        <div >{{questionProp.questionArray[questionPosition]}}</div>

    </div>
    <div :style="{'font-size': adjustingFontSizeAnswer + 'px' }" class="card-back">
      {{questionProp.answerArray[questionPosition]}}
    </div>

    </div>


  </div>

  <div class="buttonDiv" v-if="!coopMultiplayer">
      <button id="previousButton" @click="previousCLick" class="prevNextButton"> Previous </button>
      <h2 class="navH">{{ questionPosition+1}}/{{questionProp.questionArray.length}}</h2>
      <button id="nextButton" @click="nextClick" class="prevNextButton"> Next </button>
    </div>

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
    console.log("flip() ran");
    },
    nextClick: function () {
      if (this.questionPosition < this.questionProp.questionArray.length - 1) {
        setTimeout(() => this.questionPosition++, 500);
        if(this.flipped==true){
          this.flipped = !this.flipped;
        }
        this.$emit('nextClick', this.questionPosition);
      } else if (this.questionPosition == this.questionProp.questionArray.length - 1) {
        this.$emit('gameFinished');
      }
    },
    previousCLick: function () {
      if (this.questionPosition > 0) {
        this.questionPosition--;
        this.$emit('previousClick', this.questionPosition);
      }
      this.answerButtonBool = false;
    }
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
  },
  computed: {
    adjustingFontSizeAnswer: function() {
      const length = this.questionProp.answerArray[this.questionPosition].length;
      if (length > 100) {
        return 20;
      } else if (length > 50) {
        return 30;
      } else if (length > 20) {
        return 40;
      } else if (length > 15) {
        return 50;
      } else if (length < this.questionProp.questionArray[this.questionPosition].length) {
        return 60;
      } else {
        return 70;
      }
    },
    adjustingFontSizeQuestion: function() {
      const length = this.questionProp.questionArray[this.questionPosition].length;
      if (length > 100) {
        return 20;
      } else if (length > 50) {
        return 30;
      } else if (length > 20) {
        return 40;
      } else if (length > 15) {
        return 50;
      } else if (length < this.questionProp.questionArray[this.questionPosition].length) {
        return 60;
      } else {
        return 70;
      }
    }
  }
}
</script>

<style scoped>
.playDiv {
  display:flex;
  justify-content:center; 
  flex-direction:column;
  align-items:center;
 
}
.card {
 
  height:400px;
  width: 400px;
  cursor:pointer;
  perspective: 1000px;
}
.card-inner {
  user-select: none;
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
.navH {
  color:white

}
.prevNextButton{
  
  align-self: flex-end;
    
  cursor:pointer;
 
  font-Size: 18px;
  width: 200px;
  height: 60px;
  
  border-radius: 5px;
}
.buttonDiv{
  
  height: 100px;
  display: flex;
  justify-content: center;
  width:1000px;
  
 
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
#previousButton {
  animation: flash 1s fade;
  margin-right: 20px;
}
#nextButton {
  animation: flash 1s fade;
  margin-left: 20px;
}

@media screen and (max-width: 40em) {
  .playDiv{
    margin-left:50%;

  }
  
  .card {
    width:50%;
    margin-left: 10%;
    height: 600px;
  }
  .prevNextButton {
    margin-left:10%
  }
  .navH {
    color:black;
    font-size: xx-large;
  }
}
</style>