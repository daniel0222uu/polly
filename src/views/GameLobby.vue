<template>
  <BannerComponent />
  <body>
  <div id="GameLobbyPlayers">

    <h1>"Please choose your opponent:"</h1>
    <!--<select class="style-select" v-model="selectedDeck" name="drinks" required>
      <option value="" disabled selected hidden>Välj en frågelek</option>
      <option v-for="drink in selectorList" v-bind:key="drink">{{ drink }}</option>
    </select> -->

    <button @click="Choose">Select</button>
    <!--<p>
      {{questionObject.id}}
    </p>-->

  </div>
  <!--<BarsComponent v-bind:data="submittedAnswers"/>-->
  <br>

  <div>

   <!-- <div class="flippingDivs" id="questionDiv" @click="questionPress" v-if="!answerButtonBool">
      <p :class="resizeText" :style="{'font-size': fontSize + 'px' }" class="flippingDivParagraph" > {{questionObject.questionArray[questionPosition]}} </p>
    </div>

    <Transition name="fade" v-bind:key="questionPosition">

      <div class="flippingDivs" id="answerDiv" @click="answerPress" v-if="answerButtonBool">
        <p :style="{'font-size': fontSize + 'px'}" class="flippingDivParagraph" > {{questionObject.answerArray[questionPosition]}} </p>
      </div>

    </Transition>-->

  </div>







  </body>
</template>

<script>
export default {
  name: "GameLobby"
}
</script>

<style scoped>

</style>