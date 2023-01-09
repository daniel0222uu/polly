
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
  
</template>

<script>
export default {
  name: "WarningMessage",
  props: ['deckAlert', 'questionFieldAlert', 'questionWasAdded','uploadSuccessful','badString'],
  watch: {
    uploadSuccessful: function(){
      console.log("uploadSuccessful är nu: ", this.uploadSuccessful);
    }
  }
}
</script>

<style scoped>
.positionConfirmation{
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
.text{
  font-weight: bold;
  font-family: 'Kanit', sans-serif;
  font-size: 20px;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition: all 4s ease;
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