<template>
  <div  class="uploadTemplate">
    <br> <br>
    

    <div class="uploadedDeckList">
      <h3>Uploaded decks: </h3>
  <ol>
      <li  v-for="deck in this.uploadedDeckList" :key="deck">{{ deck }}</li>
    </ol>

</div>


  <div class="uploadButton">
  <button class="buttonNav" @click="testAxiosPost(uploadingObject)">Upload deck: {{uploadingObject.id}}</button>
  </div>

  </div>
</template>

<script>
//import io from "socket.io-client"; bryr mig inte om det jsut nu
import axios from 'axios';
//const socket = io();


export default {
  name: "UploadComponent",
  props: ["uploadingObject"],
  data: function(){
    return {
      uploadedDeckList:["Nordens Huvudstäder", "Historia", "bilar","databasteknik"],
      testing: {},
      selectedDeck: "",
      selectorList: [],
      deckToUpload: {},
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
        const response = await axios.post('http://localhost:8080/fileTest ', {
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
.uploadSelector {
  margin-top: 50px;
  margin-left:100px;
  
  grid-column: 2;
  
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
  .uploadSelector {
    margin-left:20px;
  }
}


</style>