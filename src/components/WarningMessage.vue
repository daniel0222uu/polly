<template>
  <transition name="fade">
    <div class="positionConfirmation" id="DeckLiked" v-if="uploadSuccessful">
      <div class="text">
        Successful upload!
      </div>
      <div>
        <iframe src="https://giphy.com/embed/kwcRp24Wz4lZm" width="60" height="60" frameBorder="0"
                class="giphy-embed" allowFullScreen></iframe>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div class="positionConfirmation" v-if="badString">
      <div class="text">
        <p>
          Your deck name has too many spaces somewhere.
        </p>
      </div>
      <div>
        <iframe src="https://giphy.com/embed/TBCqBLOxH8djXe8ztd" width="50" height="80" frameBorder="0"
                class="giphy-embed" allowFullScreen></iframe>

      </div>
    </div>
  </transition>


  <transition name="fade">
    <div id="deckNameTaken" class="positionConfirmation" v-if="deckNameTaken">
      <div>
        <p>
          There exists a public deck with the name <span style="font-weight: bold"> {{deckName}}. </span>
        </p>
      </div>
      <div>

      </div>
    </div>
  </transition>



  <transition name="fade">
    <div id="congratz" class="congratsPosition" v-if="gameFinished">
      <div style="width:500px;height:300px; background-color:white; border: 2px solid black; text-align: center;">
        <h3>
          {{instantiateuiLabels.congratz}}
          </h3> <h1 style="font-weight: bold"> {{deckName}}. </h1>
          
        <h3>
          {{instantiateuiLabels.checkResults}}
        </h3>
      </div>
      <div>

      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: "WarningMessage",
  props: ['deckAlert', 'questionFieldAlert',
    'questionWasAdded', 'uploadSuccessful',
    'badString', 'deckNameTaken', 'deckName',
  'gameFinished'],
  inject: ['uiLabels'],


  data: function () {
    return {
      instantiateuiLabels: this.uiLabels
    }
  },
  watch: {
    uploadSuccessful: function () {
    }
  }
}
</script>

<style scoped>
.congratsPosition{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 100%;
 
  
  z-index: 2;
}
.positionConfirmation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  top: 150px;
  left: 20px;
  background-color: mediumspringgreen;
  width: 300px;
  height: 80px;
  border-radius: 20px;
}
#deckNameTaken{
  background-color: beige;
  position: fixed;
  top: 20%;
  left: 20%;
}

.text {
  font-weight: bold;
  font-family: 'Kanit', sans-serif;
  font-size: 20px;
}

.fade-enter-from {
  opacity: 0.95;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 6s;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 2s ease;
}

</style>