<template>

  <body>
    <div class="editPage">
      <div>
      <div>

<select v-model="selectedDeck" name="decks" required @change="loadDeck">
  <option value="" disabled selected hidden>Pick a deck to edit</option>
  <option v-for="deck in selectorList" v-bind:key="deck">{{ deck }}</option>
</select>

</div>

<div class="editView" :class="{active: isActive}">
<div>
<header id="questionNumberHeader" v-if="!addingQuestionBool"> {{questionObject.id}} </header>
<header id="questionNumberHeader" v-if="addingQuestionBool"> QUESTION TO ADD </header>
<input class="questionEditingFields" id="questionField" type="text" v-model="questionField">
<br>
<br>
<textarea class="questionEditingFields"  id="answerField" type="text" v-model="answerField"></textarea>
</div>

<div>




<button @click="addingNewQuestion">Add new question</button>

</div>
<div>
<button @click="previousCLick" id="previousButton"> Previous </button>

 {{questionIndex + 1 }}
 
 <button @click="nextClick" id="nextButton"> Next </button>

<br>


<button @click="deleteDeckMessage" style="height:50px;">Delete deck</button>



<br>
<br>
<button @click="savingCurrentQuestion" style=" height: 50px">Save changes</button>
</div>

</div>
</div>

<div class="deleteMessage" :class="{activeMessage:showDeleteMessage}">
      <span style="font-size:20px">Are you sure you want to delete: <h5>{{ this.selectedDeck }}</h5> ?</span>
       <div class="yesAndNoDiv">
        <button class="bigButton" @click="deleteDeck">Yes</button>
        <button class="bigButton" @click="deleteDeckMessage">No</button>

       </div>
     
    </div>

    </div>

    
  
  </body>
</template>

<script>




let listToFill = [];
for (var i = 0, len = localStorage.length; i < len; ++i) {
  listToFill.push(localStorage.key(i));
}


export default {
  name: "EditAndCreateComponent",

  data: function (){
     return {
      isActive:false,
       selectedDeck: "",
       quizName: "",
       lang: "",
       pollId: "",
       question: "",
       answers: ["", ""],
       questionIndex: 0,
       data: {},
       uiLabels: {},
       questionObject: {
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
       selectorList: listToFill,
       addingQuestionBool: false,
       showDeleteMessage:false,
     }
    },
  methods: {
    saveDeck: function () {
      console.log("du klickade på en knapp med say()")
      let completeDeck = {"id": this.deckName, "questionArray": this.quizQuestions, "answerArray": this.quizAnswers};
      //defined on render. Inte bra vet inte varför.
      console.log(completeDeck);
      localStorage.setItem(completeDeck.id, JSON.stringify(completeDeck));
    },
    nameDeck: function (namingTheDeck) {
      //let id =  '{"id" :' + '"' + namingTheDeck + '" \n  }';
      console.log(namingTheDeck)
      this.deckName = namingTheDeck;
      //let deSerializedid = JSON.parse(id);
      //console.log(deSerializedid);
      //localStorage.setItem(namingTheDeck, id)
      //let myObj_deserialized = JSON.parse(localStorage.getItem(namingTheDeck));
      //localStorage.setItem(namingTheDeck,id);
      //console.log(myObj_deserialized);
    },
    questionsToDeck: function (questionToAdd) {
      this.quizQuestions.push(questionToAdd);
      console.log(this.quizQuestions);
      //console.log(this.quizQuestions);
      //let myObj_deserialized = JSON.parse(localStorage.getItem(namingTheDeck));
      //console.log(myObj_deserialized);
    },
    answersToDeck: function (answerToAdd) {
      this.quizAnswers.push(answerToAdd);
      console.log(this.quizAnswers);
    },
    loadDeck: function () {
      // if isActive is true and changes has been made, pop up= do you want to save changes before leaving? yes no

      console.log("du klickade på en knapp med loadDeck()")
      let myObj_deserialized = JSON.parse(localStorage.getItem(this.selectedDeck));
      console.log(myObj_deserialized);
      this.questionObject = myObj_deserialized;
      this.answerField = this.questionObject.answerArray[this.questionIndex];
      this.questionField = this.questionObject.questionArray[this.questionIndex];
      this.answerField = myObj_deserialized.answerArray[this.questionIndex];
      this.questionField = myObj_deserialized.questionArray[this.questionIndex];
      this.questionObject = myObj_deserialized;
      this.isActive = true;
    },
    previousCLick: function () {
      if (this.questionIndex > 0) {
        this.questionIndex -- ;
      }
      this.answerField = this.questionObject.answerArray[this.questionIndex];
      this.questionField = this.questionObject.questionArray[this.questionIndex];
      this.addingQuestionBool = false;
    },
    nextClick: function () {
      if (this.questionIndex < this.questionObject.questionArray.length - 1) {
        this.questionIndex ++ ;
      }
      this.answerField = this.questionObject.answerArray[this.questionIndex];
      this.questionField = this.questionObject.questionArray[this.questionIndex];
    },
    savingCurrentQuestion: function () {
      let question = this.questionField;
      let answer = this.answerField;
      console.log(question);
      console.log(answer);
      this.questionObject.questionArray[this.questionIndex] = question;
      this.questionObject.answerArray[this.questionIndex] = answer;
      localStorage.setItem(this.questionObject.id, JSON.stringify(this.questionObject));
    }, //detta fungerar men känns jätteupplagt för bugggar. Vi får hålla koll på detta.
    addingNewQuestion: function () {
      this.questionIndex = this.questionObject.questionArray.length;
      this.questionField = "";
      this.answerField = "";
      this.addingQuestionBool = true;
    },
    savingAddedQustion: function () {
      let question = this.questionField;
      let answer = this.answerField;
      console.log(question);
      console.log(answer);
      this.questionObject.questionArray.push(question);
      this.questionObject.answerArray.push(answer);
      localStorage.setItem(this.questionObject.id, JSON.stringify(this.questionObject));
      this.addingQuestionBool = false;
    },

    deleteDeckMessage: function() {
      this.showDeleteMessage= !this.showDeleteMessage;

    },

    deleteDeck: function() {
      console.log("you have deleted: " + this.selectedDeck);
      localStorage.removeItem(this.selectedDeck);

      /*
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        this.selectorList.push(localStorage.key(i));
      }

     */

      this.isActive = false;
      this.showDeleteMessage= !this.showDeleteMessage;

    }
  }
  }
</script>


<style scoped>
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
  width: 400px;
  height: 410px;
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


#nextButton{
  margin: 40px;
}
.questionEditingFields{
  font-size: 14px;
  
}

#questionNumberHeader{
  font-size: 24px;
  text-align: center;
}

@media screen and (max-width:40em) {


.deleteMessage {
  width: 75%;
}



}
</style>