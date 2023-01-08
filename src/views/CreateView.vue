<template>
  <body>
    
  <!-- Här är första sidan-->

    <div class="firstView" :class="{notActive: deckIsNamed}">

      <!-- Två varningsmeddelande som visas bara om villkoren är mötta -->

      <div class = deckNameWarning :class="{showText:showText}">
        Give your deck a name to continue!
      </div>
      
      <div style="margin-bottom:10px" class = deckNameWarning :class="{showText:duplicateName}">
        Your already have a deck with this name!
      </div>
      
       <!-- Här ger man namn och skapar deck-->

      <div>
        <input class="questionEditingFields" :class="{fieldEmpty:showText ,fieldDuplicate:duplicateName}"  autocomplete="off" placeholder="Name your deck here" id="namingDeckField" type="text" v-model="deckName">
      
        <button style="padding:5px; margin:5px;" @click="createDeck(deckName)">Create new deck</button> {{questionObject.id}}

      </div>
      
       
    </div>



    <!-- Här är andra sidan -->

    <div :class="{notActive: !deckIsNamed}">

      <div id="wrapperDiv">

        <!-- Här visas titeln-->

        <h3>{{questionObject.id}} </h3>

        
        <div class="horizontalDiv">



          <!-- Här visas alla frågor som har skapats -->

          <div class="questionList" >

                 <ol>
                   <li  v-for="item in questionObject.questionArray" :key="item">{{ item }}</li>
                 </ol>
             </div>

          <div class="inputFields">

            <!--Varningsmeddelande-->

            <div style="margin-bottom:5px" class="deckNameWarning" :class="{showText:questionAlert || answerAlert}">
             
              No empty fields!
            </div>
           
            
             


                  <!-- Här lägger man till kort (frågor och svar)-->
           
          <textarea style="height:50px;" class="questionEditingFields" :class="{fieldEmpty:questionAlert}"  placeholder="Question"  v-model="questionField"></textarea>
           <br>
           
          
           <textarea style="height:100px;" class="questionEditingFields"  :class="{fieldEmpty:answerAlert}" placeholder="Answer" v-model="answerField"></textarea>
            
           <button class="buttonPosition" @click="saveCard">Add card</button>
          

          </div>

        </div>

      </div>

    </div>
  

  </body>

</template>


<script>
import io from 'socket.io-client';

const socket = io();

let listToFill = [];
for (var i = 0, len = localStorage.length; i < len; ++i) {
  listToFill.push(localStorage.key(i));
}

export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "", 
      pollId: "", //behövs?
      questionIndex: 0, //behövs?
      data: {},
      uiLabels: {},
      questionObject: {
        "id": "",
        "questionArray": [],
        "answerArray": []
      },
      questionField: "",
      answerField: "",
      deckName: "",
      selectorList: listToFill,
      deckIsNamed: false,
      showText: false,
      duplicateName: false,
      questionAlert: false,
      answerAlert: false
      
    }
  },
  components: {
    
    
    //EditAndCreateComponent Not using it for now
  },
  created: function () {
    this.lang = this.$route.params.lang;
    console.log(this.lang)
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods: {
   /*       Vad gör dom här?
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers})
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }, 

            Vad gör dom här?
    */
    createDeck: function (deckName) {
     
      for (let i=0, len= this.selectorList.length; i<len; i++)  {
      if (deckName === this.selectorList[i]) {
        console.log("duplicate name!!!")
        this.duplicateNameAlert();
        return;
      }
      }
     
      if (deckName === "") {
        console.log("Please name your deck");
        this.noNameAlert();
        return;
      }
     
      
      
      console.log(deckName)
      this.deckName = deckName;
      this.questionObject.id = deckName;
      this.deckIsNamed = true;
      
    },

    /*
    Kan vi ta bort detta? 
    nextClick: function () {
      let initializeQarrayLength = this.questionObject.questionArray.length
      if (this.questionIndex < initializeQarrayLength - 1) {
        this.questionIndex++
      }
      console.log(this.questionIndex)
    },
    previousCLick: function () {
      if (this.questionIndex > 0) {
        this.questionIndex--
      }
      console.log(this.questionIndex)
    },
    Kan vi ta bort detta? 
    */
    saveCard: function () {
      let question = this.questionField;
      let answer = this.answerField;
      if (question === "" || answer === "") {
        if (question === "") {
          this.questionFieldAlert()
          

        }
        if (answer === "") {
          this.answerFieldAlert()
          

        }
       return;
      }
      if (question === "" || answer === "" ) {
        
        
        return;
        
      }
      
      this.questionObject.questionArray.push(question);
      this.questionObject.answerArray.push(answer);

      localStorage.setItem(this.questionObject.id, JSON.stringify(this.questionObject));

      this.questionField = "";
      this.answerField = "";
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        this.selectorList.push(localStorage.key(i));
      }
      
    },

    noNameAlert(){
      this.showText = true;
      setTimeout(() => {
        this.showText = false;
      }, 2000);
    },

    duplicateNameAlert(){
      this.duplicateName = true;
      setTimeout(() => {
        this.duplicateName = false;
      }, 2000);
    },

    questionFieldAlert(){
      this.questionAlert = true;
      setTimeout(() => {
        this.questionAlert = false;
      }, 2000);
    },

    answerFieldAlert(){
      this.answerAlert = true;
      setTimeout(() => {
        this.answerAlert = false;
      }, 2000);
    },
  },

}
</script>

<style scoped>

ol {
  margin-right:20px;
  list-style-type: upper-roman;
  
  border: 5px ridge lightseagreen;
  font-size: 20px;
  
  
  overflow: hidden;
 
  
}

.deckNameWarning {
  color: transparent;
  user-select: none;
  font-family: Helvetica;
  font-size: 16px;
  

}
.showText {
color:black;
}
.fieldEmpty {
  border:1px solid red;
}
.fieldDuplicate {
  border:1px solid blue;

}


.questionEditingFields:focus::placeholder {
  color: transparent;
}




.inputFields {
grid-column: 3;

width: 300px;


 
}


.firstView {
  margin-top:5%;
  display: flex;
  
  align-items: center;
  flex-direction: column;
 
}
.horizontalDiv{
  display: grid;
  grid-template-columns: repeat(5, 20%);
  
 
}

.notActive {
  display:none;

}

.buttonPosition {
  width: 90%;
  height: 30%;
}

.questionList{
  
 grid-column: 2;
 
 
  
}
.questionEditingFields{
  width: 90%;
  height: 40px;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  
  
}


@media screen and (max-width:40em) {
  .horizontalDiv {
display:flex;
align-items: center;
flex-direction: column-reverse;


  }
  .questionList {
    margin-top:10px;
    
    color:white;
    max-width: 300px;
  }
  .firstView {
  margin-top:none;
}
.buttonPosition {
  width: 90%;
  height: 50px;
}

}



</style>