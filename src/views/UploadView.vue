<template>


  <div id="wrapperDiv">
    <div id="selector">
      <select name="decks" required v-model="selectedDeck" @change="loadDeck(this.selectedDeck)">
        <option value="" disabled selected hidden></option>
        <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{ deck }}</option>
      </select>
    </div>

    <div id="uploadDiv">

        <upload-component v-bind:uploading-object="deckToAxios"
                          @upload-sucessful="successfulUpload"
        ></upload-component>

    </div>

    <div id="confirmationDiv">
      <warning-message v-bind:upload-successful="uploadSuccessfulBool"></warning-message>
    </div>


  </div>


</template>

<script>

import UploadComponent from "@/components/UploadComponent";
import WarningMessage from "@/components/WarningMessage";


export default {
  name: "UploadView",
  components: {
    UploadComponent,
    WarningMessage
  },
  data: function () {
    return {
      selectedDeck: "",
      selectorList: [],
      deckToUpload: {},
      deckToAxios: {
        id: "",
        questionArray: [],
        answerArray: [],
        likes: 0,
        hints: []
      },
      uploadSuccessfulBool: false,
    }
  },
  created() {
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      this.selectorList.push(localStorage.key(i));
    }
  },
  methods: {
    loadDeck: function (deck) {
      this.questionPosition = 0;
      console.log("du klickade på en knapp med loadDeck()", deck);
      this.deckToUpload = JSON.parse(localStorage.getItem(deck));
      this.deckToAxios.id = this.deckToUpload.id;
      this.deckToAxios.questionArray = this.deckToUpload.questionArray;
      this.deckToAxios.answerArray = this.deckToUpload.answerArray;
    },
    successfulUpload: function () {
      this.uploadSuccessfulBool = true;
      setTimeout(() => this.uploadSuccessfulBool = false, 3000);
    }
  }

}
</script>

<style scoped>

#wrapperDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#uploadDiv {
  flex-direction: column;
  height: 120px;
  justify-content: space-evenly;
  align-items: center;
}

#confirmationDiv {
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

select {
  padding: 1em;
  width: 100%;
  border-radius: .2em;
  border: 1px solid #acacac;
  color: black;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;

  background: url('https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/dropdown_arrow-512.png');
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: right;
  background-origin: content-box;
}

#selector {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  width: 200px;

}

</style>