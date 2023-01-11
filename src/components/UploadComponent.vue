<template>
  <div  class="uploadTemplate">
    <br> <br>
    

    <div class="uploadedDeckList">
      <h3>Public decks: </h3>
  <ol>
      <li  v-for="deck in uploadedDecks" :key="deck">{{ deck.id}}</li>
    </ol>

</div>


  <div class="uploadButton">
  <button style="
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
      cursor: pointer:
      webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      border-radius: 15px;
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);"
      @click="testAxiosPost(uploadingObject)">{{instantiateuiLabels.uploadDeck}}: {{uploadingObject.id}}</button>
  </div>

  </div>
</template>

<script>
import axios from 'axios';
import Decks from "@/assetts/Decks.json";


export default {
  name: "UploadComponent",
  props: ["uploadingObject"],
  
  inject: ['uiLabels'],
  data: function(){
    return {
      testing: {},
      selectedDeck: "",
      selectorList: [],
      deckToUpload: {},
      uploadedDecks: Decks,
      instantiateuiLabels: this.uiLabels
    }
  },
  created(){
      for (var i =0, len = localStorage.length; i< len; ++i )
      {
        this.selectorList.push(localStorage.key(i));
      }
  },
  methods: {
    async testAxiosPost(deckToUpload) {
      if(deckToUpload.id===""){
        return;
      }
      try {
        const response = await axios.post('http://localhost:8080/uploadDeck ', {
          data: deckToUpload,
          headers:{
            'Content-Type': 'application/json'
          },
        });
        console.log(response.data);
        this.$emit('uploadSucessful');
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style scoped>
select {
  
  width:200px;
}
option {
  
}
ol {
  padding-left:60px;
  list-style-type: upper-roman;
  
  border: 4px ridge   rgb(32, 90, 178);
  font-size: 20px;
  
  
  overflow: hidden;
  
 
  
}
.uploadTemplate {
 
  margin-left:10%;
  height: auto;
  justify-content: left;
  margin-right:10%;
  display: grid;
  grid-template-columns: repeat(3, auto-fit);
  grid-template-rows: repeat(3, auto);
 
  
 
}
.uploadButton {
  grid-column: 3;
  margin-left:100px;

  
  
  
}
.uploadedDeckList {
  width:400px;
  grid-column: 1;
 
}

.buttonNav {
  
  
  font-family: 'Kanit', sans-serif;
  font-size: 16px;
 
    height: 100px;
    width:220px;
   
    user-select: none;
    text-transform: uppercase;
    
    letter-spacing: 0.1em;
    text-decoration: none;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 3%;
    border: 2px solid black;
    background-color: #fec89a;
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid #000;
 
    transition: box-shadow 300ms ease, transform 300ms ease;
    
    

    border-radius: 10px;
}

.buttonNav:hover{




transform: translateY(-3px);

}
.buttonNav:active{
  transform: translateY(10px);
}

@media screen and (max-width:72em) {
  .uploadButton {
    grid-column: 2;
  }

}
@media screen and (max-width:51em) {
  .uploadTemplate {
    justify-content: center;
  }
  .uploadedDeckList{
    grid-column: 2;
    grid-row:3;
  }
  .uploadButton {
    grid-row: 2;
  }
}


</style>