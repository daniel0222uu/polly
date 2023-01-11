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
  props: ['questionProp','showAnswer','pollId',
    'coopMultiplayer','deckLoaded','disableClick'],
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
        setTimeout(() => this.questionPosition++, 0);
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
        this.flipped = true;
        console.log("showAnswer is true and answer length is: ", this.questionProp.answerArray[this.questionPosition].length);
        console.log("time before the flip occurs is: ", this.timeBeforeFlip);
        setTimeout(() => this.flipped = false, this.timeBeforeFlip);
        setTimeout(() => this.nextClick(), this.timeBeforeFlip + 1000);
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
    timeBeforeFlip: function () {
      const length = this.questionProp.answerArray[this.questionPosition].length;
      console.log("length is: ", length);
      if (10> length > 50) {
        return 4000;
      } else if (50 > length > 200) {
        return 7000;
      } else if (200> length > 300) {
        return 8000;
      } else if (300 > length > 400) {
        return 9000;
      } else if (400 > length > 500) {
        return 11000;
      } else if(500> length > 600) {
        return 13000;
      } else if(600 < length ) {
        return 20000;
      }
      else {
        return 5000;
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
  
  
  
}
.card-front {
  color: black;
  font-size: 18px;
  background-color: #eccf95;
  border: 10px inset #9aa4fe;
  
  
}
.card-back {
  font-size: 14px;
 
  transform: rotateY(180deg);
  background-color: #9aa4fe;
  border: 10px inset #ffe1a6;
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
  background-color: #fec89a;
  border: solid black;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family: 'Kanit', sans-serif;
  margin: 4px 2px;
  cursor: pointer;
  webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  border-radius: 15px;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
#nextButton {
  animation: flash 1s fade;
  margin-left: 20px;
  background-color: #fec89a;
  border: solid black;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family: 'Kanit', sans-serif;
  margin: 4px 2px;
  cursor: pointer;
  webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  border-radius: 15px;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

@media screen and (max-width: 30em) {
 
  
  .card {
    width:400px;
 
  }
  
  .navH {
    color:black;
    font-size: xx-large;
  }
  
}
@media screen and (max-width: 20em) {
 
  
 .card {
   width:300px

 }
 
}
@media screen and (max-width: 15em) {
 
  
 .card {
   width:200px

 }
 
}


</style>