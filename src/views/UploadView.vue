<template>
  <body>
  <div id="selector">
    <select  name="decks" required v-model="selectedDeck" @change="loadDeck(this.selectedDeck)" >
      <option value="" disabled selected hidden></option>
      <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{deck}}</option>
    </select>
  </div>
  <div>
    container div
  </div>
  <div>
    <upload-component v-bind:uploading-object="deckToAxios" ></upload-component>
  </div>
  </body>
</template>

<script>

import UploadComponent from "@/components/UploadComponent";



export default {
  name: "UploadView",
  components: {
    UploadComponent
  },
  data: function(){
    return{
      selectedDeck: "",
      selectorList: [],
      deckToUpload: {},
      deckToAxios: {
        id:"",
        questionArray:[],
        answerArray:[],
        likes: 0}
    }
  },
  created(){
      for (var i =0, len = localStorage.length; i< len; ++i )
      {
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
  }

}
</script>

<style scoped>

</style>