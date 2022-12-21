<template>
  <div id="cardsDiv" >
    <div class="flippingDivs" id="questionDiv" @click="questionPress" v-if="!answerButtonBool">
      <p :class="resizeText" :style="{'font-size': fontSize + 'px' }" class="flippingDivParagraph" > {{questionProp.questionArray[questionPosition]}} </p>
    </div>

    <Transition name="fade" v-bind:key="questionPosition">

      <div class="flippingDivs" id="answerDiv" @click="answerPress" v-if="answerButtonBool">
        <p :style="{'font-size': fontSize + 'px'}" class="flippingDivParagraph" > {{questionProp.answerArray[questionPosition]}} </p>
      </div>

    </Transition>
    <div class="buttonDiv">
      <button @click="previousCLick" class="prevNextButton"> Previous </button> <button @click="nextClick" class="prevNextButton"> Next </button>
    </div>

  </div>
</template>

<script>
export default {
  name: "FlashcardView",
  props:['questionProp'],
  data: function(){
    return{
      answerButtonBool: false,
      fontSize: 80,
      questionPosition: 0,
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
      if(this.questionPosition < this.questionProp.questionArray.length - 1){
        this.questionPosition = this.questionPosition + 1;
      }
      this.answerButtonBool = false;
      this.fontSize = 80;
    },
    adjustAnswerFontSize: function() {
      const length = this.questionProp.answerArray[this.questionPosition].length;
      console.log(length);
      if (length > 100) {
        this.fontSize = 20;
      } else if (length > 50) {
        this.fontSize = 35;
      } else if (length < this.questionProp.questionArray[this.questionPosition].length) {
        return;
      } else {
        this.fontSize = 80;
      }
    }
  },
  watch: {
    questionProp: function() {
      this.questionPosition = 0;
    }
  },
}
</script>

<style scoped>

#questionDiv{
  background-color: beige;
}
#answerDiv{
  background-color: mediumspringgreen;
}
.flippingDivs{
  margin-left: 5%;
  margin-right: 5%;
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


</style>