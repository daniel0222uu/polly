<template>
  <transition name="fade">
  <div class="positionWarning" id="deckNameWarning" v-if="deckAlert">
    <p class="text">YOU HAVE TO NAME YOUR DECK</p>
  </div>
  </transition>

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
</template>

<script>
export default {
  name: "WarningMessage",
  props: ['deckAlert', 'questionFieldAlert', 'questionWasAdded'],
}
</script>

<style scoped>
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
.positionWarning{
  z-index: 9;
  position: fixed;
  top: 200px;
  right: 20px;
  background-color: red;
  width: 300px;
  height: 50px;
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
  text-align: center;
  border: 1px solid;
  opaqueness: 0.8;
}
.text{
  text-align: center;
}

</style>