<template>

  <body>
    <div class="editPage">



      <div>
      <div>

<select id = "selector" v-model="selectedDeck" name="decks" required @change="loadDeck">
  <option value="" disabled selected hidden>{{instantiateuiLabels.pickDeckEdit}}</option>
  <option v-for="deck in selectorList" v-bind:key="deck">{{ deck }}</option>
</select>


</div>

<div class="editView" :class="{active: isActive}">
<div>
<header id="questionNumberHeader" >
  <input class=" titleChangeField"   autocomplete="off"
         id="namingDeckField" type="text"
         v-model="this.deckObject.id" ></header>

<br>


<textarea class="questionEditingFields"
          id="questionField" placeholder="Question"
          v-model="questionField"></textarea>

<br>
<br>
<textarea style="height:50px;" class="questionEditingFields"
          id="answerField" placeholder="Answer"
          v-model="answerField"></textarea>
</div>



<div>
  <div class="prevAndNextDiv">
    <button @click="previousCLick" class="prevButton">{{instantiateuiLabels.previous}} </button>

 <span style="font-size:x-large; position: absolute;">{{deckIndex + 1 }} / {{this.deckObject.questionArray.length }}</span>

 <button @click="nextClick" class="nextButton">{{instantiateuiLabels.next}} </button>

  </div>

<ResposiveNav v-bind:hideNav="hideNav">

  <button class="buttonNav" @click="addCard">{{instantiateuiLabels.addCard}}</button>
  <button class="buttonNav" @click="deleteCard">{{instantiateuiLabels.deleteCard}}</button>
  <button class="buttonNav" @click="saveCard" >{{instantiateuiLabels.saveChanges}}</button>
  <button class="buttonNav" @click="deleteDeckMessage" >{{instantiateuiLabels.deleteDeck}}</button>




</ResposiveNav>
 <div>






</div>



</div>

</div>

</div>


<div class="deleteMessage" :class="{activeMessage:showDeleteMessage}">
      <span style="font-size:20px; font-family: Arial, Helvetica;">Are you sure you want to delete: <h5 style="font-style:italic">{{ this.selectedDeck }}</h5> <h2>?</h2><br>Nothing will be saved.</span>
       <div class="yesAndNoDiv">
        <button class="bigButton" @click="deleteDeck">Yes</button>
        <button class="bigButton" @click="deleteDeckMessage">No</button>

       </div>

    </div>

    </div>



  </body>
</template>

<script>

import ResposiveNav from "./ResponsiveNav";







export default {
  name: "EditComponent",

  inject: ['uiLabels'],

  data: function (){
     return {
      hideNav: true,
      isActive:false,
       selectedDeck: "",
       quizName: "",
       lang: "",
       pollId: "",
       question: "",
       answers: ["", ""],
       deckIndex: 0,
       data: {},
       uiLabels: {},
       deckObject: {
         "id": "Sveriges huvudstäder",
         "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
         "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]
       }, //Nu gjorde vi om så att objektet inte är i en lista, fungerar
       //att hämta från singulär objekt.
       answerButtonBool: false,
       questionField: "",
       answerField: "",
       deckName: "",
       quizQuestions: [],
       quizAnswers: [],
       selectorList: [],
       addingQuestionBool: false,
       showDeleteMessage:false,
       instantiateuiLabels: this.uiLabels
     }

    },
    components: {
      ResposiveNav

    },
    created: function() {
      
      
for (var i = 0, len = localStorage.length; i < len; ++i) {
  this.selectorList.push(localStorage.key(i));
}

    },
  methods: {
    loadDeck: function () {
      this.deckIndex = 0;
      // if isActive is true and changes has been made, pop up= do you want to save changes before leaving? yes no
      console.log(this.selectedDeck)

      let myObj_deserialized = JSON.parse(localStorage.getItem(this.selectedDeck));

      this.deckObject = myObj_deserialized;

      this.answerField = this.deckObject.answerArray[this.deckIndex];
      this.questionField = this.deckObject.questionArray[this.deckIndex];
      this.answerField = myObj_deserialized.answerArray[this.deckIndex];
      this.questionField = myObj_deserialized.questionArray[this.deckIndex];
      this.deckObject = myObj_deserialized;
      this.isActive = true;

    },
    previousCLick: function () {
      this.saveCard();
      if (this.deckIndex != 0) {
        this.deckIndex -- ;
      }
      else if (this.deckIndex == 0) {

        this.deckIndex = this.deckObject.questionArray.length -1;

      }
      this.answerField = this.deckObject.answerArray[this.deckIndex];
      this.questionField = this.deckObject.questionArray[this.deckIndex];
      this.addingQuestionBool = false;
    },
    nextClick: function () {
      this.saveCard();
      if (this.deckIndex < this.deckObject.questionArray.length - 1) {
        this.deckIndex ++ ;
      }
      else if (this.deckIndex == this.deckObject.questionArray.length - 1) {
        this.deckIndex = 0;
      }
      this.answerField = this.deckObject.answerArray[this.deckIndex];
      this.questionField = this.deckObject.questionArray[this.deckIndex];

    },
    saveCard: function () {
      localStorage.removeItem(this.selectedDeck);
      this.deckObject.questionArray[this.deckIndex] = this.questionField;
      this.deckObject.answerArray[this.deckIndex] = this.answerField;
      localStorage.setItem(this.deckObject.id, JSON.stringify(this.deckObject));
      this.selectorList = [];
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        this.selectorList.push(localStorage.key(i));
      }


    },
    addCard: function () {
      this.saveCard();
      this.deckIndex = this.deckObject.questionArray.length;
      this.questionField = "";
      this.answerField = "";
      this.addingQuestionBool = true;
      this.saveCard();
    },
    deleteDeckMessage: function() {
      this.showDeleteMessage= !this.showDeleteMessage;
    },
    deleteCard: function() {
      if (this.deckObject.answerArray.length == 1) {
        this.deleteDeckMessage();
        return;
      }
      this.deckObject.questionArray.splice(this.deckIndex , 1);
      this.deckObject.answerArray.splice(this.deckIndex , 1);
      localStorage.setItem(this.deckObject.id, JSON.stringify(this.deckObject));

      if (this.deckIndex == this.deckObject.answerArray.length) {
        this.deckIndex--;

      }
      this.questionField = this.deckObject.questionArray[this.deckIndex];
      this.answerField = this.deckObject.answerArray[this.deckIndex];
    },

    deleteDeck: function() {
      console.log("you have deleted: " + this.selectedDeck);
      localStorage.removeItem(this.selectedDeck);
      this.selectorList = [];
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        this.selectorList.push(localStorage.key(i));
      }
      this.isActive = false;
      this.showDeleteMessage= !this.showDeleteMessage;
    }
  }
  }
</script>


<style scoped>
select {
  width: 200px;
  height: 30px;
  border: 2px solid black;
  border-radius:5px;

}



nav {

    width:100%;
    height: 160px;
    display: grid;
    grid-template-rows: repeat(auto-fit, 10em);




    justify-content: center;

  }
.buttonNav {
    color: white;
    user-select: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 3%;
    border: 2px solid black;
    background-color: rgb(32, 90, 178);
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid #000;
    background-color: rgb(32, 90, 178);
    transition: box-shadow 300ms ease, transform 500ms ease;



    border-radius: 10px;
}

.buttonNav:hover{
color: white;
border: 2px solid white;
background-color: rgb(32, 90, 178);

transform: translateY(-10px);

}
.buttonNav:active{
  transform: translateY(10px);
}
.prevButton, .nextButton{
  user-select: none;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid black;
  font-Size: 16px;
  font-family: 'Kanit', sans-serif;
  width:110px;
  margin:35px;
  height: 40px;
  background-color: #fec89a;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

.prevButton:active {
transform: translateX(-2px);
}
.nextButton:active {
  transform: translateX(2px);
}

.prevAndNextDiv {

  display:flex;
  justify-content: center;
  height: 100px;





}


.yesAndNoDiv {
  display: flex;
  justify-content: space-around;



}
.bigButton {
  width: 150px;
  height: 70px;

}
.editPage {
  display: flex;
  justify-content: center;
}
.deleteMessage {
  display:none;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  width: 650px;
  height: 430px;
  z-index:1;
  background-color: white;
  user-select: none;
  border:1px solid black;

}

.editView{
  display: none;

}
.activeMessage {
  display:flex
}
.active {
  display: block;
}
.titleChangeField {
  background: transparent;
  font-size: xx-large;




}
.questionEditingFields, .titleChangeField{


  border:none;
  text-align: center;

  width:300px;
  /*
  background: transparent;
  border: none;
  */
}
.questionEditingFields {
  background-color: rgba(235, 251, 255, 0.836);
  font-size: larger;

}

.questionEditingFields:focus::placeholder {
  color: transparent;

}

#questionNumberHeader{
  font-size: 24px;
  text-align: center;
  margin-top:10px;

}

@media screen and (max-width:50em) {

  button {
    height: 40px;


  }

  nav {
    margin:10px;
    position: relative;
    height:100vh;
    top: 3em;
    left: 0;
    width:95%;
    display: grid;
    grid-template-rows: repeat(auto-fit, 3em);
    transition: 1.5s;
  }

  nav ::v-slotted(a) {
    justify-content: left;
    padding-left: none;




  }

  .deleteMessage {
  width: 100%;
  height: 80%;

}


  .hide {
    left: 0;
  }
}

@media screen and (max-width:20em) {
  nav {
    position: absolute;
    top:65%;
    transition: 0.1s;
  }
  .editPage{

    overflow: hidden;
  }

}

#selector {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  width: 200px;

}





</style>