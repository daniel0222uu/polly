





<!--

  Denna commponent används inte längre i createView. Behövs den fortfarande?


-->












<template>
  
  <div class="positionWarning" id="deckNameWarning" v-if="deckAlert">
    <p class="text">Please enter a name to continue</p>
  </div>
  
<!--

<transition name="fade">
  <div class="positionWarning" id="deckNameWarning" v-if="questionFieldAlert">
    <p class="text">NO EMPTY FIELDS</p>
  </div>
  </transition>

  <transition name="fade">
    <div class="positionConfirmation" id="addedConfirmation" v-if="questionWasAdded">
      <p class="text"> YOU ADDED A QUESTION</p>
    </div>
  </transition>

 Popup för likes och användarkommentarer på decks

  <transition name="fade">
    <div class="positionConfirmation" id="DeckLiked" v-if="DeckWasLiked">
      <p class="text"> Thank you for liking this deck!</p>
    </div>
  </transition>

-->
  
</template>

<script>
export default {
  name: "WarningMessage",
  props: ['deckAlert', 'questionFieldAlert', 'questionWasAdded','DeckWasLiked'],
}
</script>

<style scoped>

.positionWarning{
  
 
  z-index: 9;
  position: fixed;

  right: 20px;
  background-color: red;
  width: 300px;
  height: 150px;
}
.positionConfirmation{
  display: flex;
  z-index: 9;
  position: fixed;
  top: 150px;
  left: 20px;
  background-color: mediumspringgreen;
  width: 300px;
  height: 30px;
  justify-content: center;
}
#deckNameWarning{
  
  border: 1px solid;
  
}
.text{
  text-align: center;
}

/*
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
  transition: all 0.5s ease;
}
*/

</style>