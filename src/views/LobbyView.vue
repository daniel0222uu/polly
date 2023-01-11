  <template>

    <WarningMessage
        v-bind:game-finished="congratzMessage" v-bind:deck-name="myObj_deserialized.id"
    >
    </WarningMessage>
  <!--Player name-->
    <div style="display:flex; justify-content:center; align-items:center">
       <p style="margin-right:5px">Player:</p> <h3>{{name}}</h3>
    </div>

    <div id="wholeScreen">

      <!--Progress bar-->
      <div v-if="showProgressBar" >
        <progress-bar-component v-bind:progress="trueCountProgress"></progress-bar-component>
      {{trueCount}} out of {{trueValuesNeeded}} players wants to flip the card

      </div>
      
      
   
    <div id="wrapperDiv" >
      
        

      

      <!--Player chatbox-->
      <div class="chatBox" :class="{hiddenChatBox:!chatOpen, playingChat:showPressToSeeQuestion}">
        <span v-for="player in players" v-bind:key="player" > {{player}},  </span>
        <div>
          
          <textarea id="chatWindow" readonly :placeholder="instantiateuiLabels" v-model="messages">
        </textarea>
          <p>
            <input placeholder="Type in chat" v-model="newMessage"/>
            <button @click="sendMessage(newMessage)">Send</button></p>
        </div>
      </div>


      <div v-if="showPressToSeeQuestion" class="playDiv">


        <FlashcardComponent v-bind:questionProp="myObj_deserialized" v-bind:show-answer="swapSides"
                            v-bind:poll-id="pollId" v-bind:coop-multiplayer="hideNextButtons" v-bind:deck-loaded="resetQuestionPosition"
                            v-bind:disable-click="clickableFlashcardBool"
                            @nextClick="onClickChild" @previousClick="onClickChild" @gameFinished="gameWasFinished"
        ></FlashcardComponent>

      </div>

      <!--Viktig för att hålla knapparna på plats!-->
      <div class="placeHolder" v-if="!menuOpen && !showPressToSeeQuestion"></div>

      <div class="menu" :class="{hiddenMenu:!menuOpen, playingMenu:showPressToSeeQuestion}">

        <div>
          <br>
          
          <select style="padding:5px" name="decks" required v-model="selectedDeck" @change="suggestGame" >
            <option value="" disabled selected hidden>Suggest a deck to play</option>
            <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{deck}}</option>
          </select>
        </div>
        
        <ul>
          <li v-for="deck in suggestedDecks" v-bind:key="deck"> 
            
            <b>{{deck.id}}</b> 
            <button style="
              background-color: #fec89a;
              border: solid black;
              color: black;
              padding: 5px 10px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 12px;
              font-family: 'Kanit', sans-serif;
              margin: 4px 2px;
              cursor: pointer;
              webkit-transition-duration: 0.4s; /* Safari */
              transition-duration: 0.4s;
              border-radius: 15px;
              box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);" 
              @click="acceptGame(deck.id)">Vote</button>
            
            
            {{deck.votes}} / {{players.length}}
            
          </li>
        </ul>
        <br>


        <ActivePlayersComponent  v-bind:player-nick-name="name" v-bind:uniqueLobbyID="pollId"
                                v-bind:in-lobby="inLobbyBool"
        ></ActivePlayersComponent>

      </div>
    



    </div>

    <div id="belowGame">
      <ResponsivNav>
        
      
        <button class="buttonNav" v-if="clickableFlashcardBool" @click="likeDeck(myObj_deserialized.id)"> Like deck</button>
        <button  class="buttonNav" @click="chatClick">{{chatbuttonText}} </button>
        <button class="buttonNav" v-if="showPressToSeeQuestion"  @click="seeQuestion">Flip card </button>
        <button class="buttonNav"  @click="menuClick">{{menubuttonText}} </button>
        

      

      </ResponsivNav>

      

    </div>


    </div>

</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
import FlashcardComponent from "@/components/FlashcardComponent";
import ActivePlayersComponent from "@/components/ActivePlayersComponent";
import ResponsivNav from "@/components/ResponsiveNav.vue";
//import JoinLobbyComponent from "@/components/JoinLobbyComponent";
import Decks from "@/assetts/Decks.json";
import ProgressBarComponent from "@/components/ProgressBarComponent";
import WarningMessage from "@/components/WarningMessage";
import axios from "axios";
const socket = io();

let selectList = Decks;
const idListFromAllDecks = selectList.map(element => element.id);

export default {
  name: 'LobbyView',
  inject: ['uiLabels'],
  components: {
    FlashcardComponent,
    ActivePlayersComponent,
    ProgressBarComponent,
    ResponsivNav,
    WarningMessage
  },
  data: function () {
    return {
      inLobbyBool: true,
      chatbuttonText: 'Open chat lobby',
      chatOpen: false,
      menubuttonText: 'Close menu',
      menuOpen: true,
      showProgressBar: false,
      votedDecks: [],
      name: "",
      haveReceivedName: false,
      pollId: "inactive poll",
      questionObject: {
        "id": "Sveriges huvudstäder",
        "questionArray": ["Vote for  a deck to play!","Can't find one? Create your own!"],
        "answerArray": ["Or not?","Or yes?"]
      },
      players: [],
      trueValuesNeeded: 0,
      trueCount: 0,
      swapSides: false,
      selectedDeck: "",
      myObj_deserialized: {},
      selectorList: idListFromAllDecks,
      hideNextButtons: true,
      resetQuestionPosition: false,
      suggestedDecks: [],
      suggestedDecksChanged: 0,
      newMessage: "",
      messages: '',
      showPressToSeeQuestion: false,
      seeFlashcardBool: false,
      clickableFlashcardBool: false,
      congratzMessage: false,
      instantiateuiLabels: this.uiLabels
    }
  },
  created: function () {
    this.myObj_deserialized = this.questionObject;
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
        this.question = q
    )
    socket.emit("getPlayers", {pollId: this.pollId})
    socket.on("dataUpdate", answers =>
        this.players = answers
    )
    socket.on('totalTrueValues', totalTrueValues => {
      this.trueValuesNeeded = totalTrueValues;
    })
    socket.on('updateTrueCount', () => {
      this.trueCount++;
    })
    socket.on('resetTrueCount', () => {
      this.trueCount = 0;
      this.seeFlashcardBool = false;
    })
    socket.on('instantiateDeck', deck => {
      this.myObj_deserialized = deck;
    })
    socket.on('gameSuggested', deckThatWasSuggested => {
      let deckName = deckThatWasSuggested;
      let objectToPush = {id: deckName, votes: 0};
      for (var i = 0, len = this.suggestedDecks.length; i < len; ++i) {
        if (this.suggestedDecks[i].id ==objectToPush.id) {
          console.log('Det finns redan en sådan deck')
          return;
          

        }
       
      }
      this.suggestedDecks.push(objectToPush);
      this.suggestedDecksChanged++;
      

  
    })
    socket.on('gameAccepted', deckName => {
      console.log("gameAccepted received on the client side");
      //let deckName = deckToUpdateVoteCount;
      for (let deck of this.suggestedDecks) {
        if (deck.id === deckName) {
          deck.votes++;
        }
      }
      this.suggestedDecksChanged++;
    })
    socket.on('appendChatMessage', message => {
      console.log("appendChatMessage received on the client side");
      let messageToAppend = message.player + ": " + message.message;
      this.messages += messageToAppend + '\n'
    })
  },
  methods: {
    exitPlaying: function () {
          this.joinedBoolean = false;
          socket.emit("exitPlaying", {name: this.name});
        },
    closeChat: function() {
      this.chatbuttonText = 'Open chat lobby'
      this.chatOpen = false
    },
    chatClick: function() {
      
      if (this.chatOpen) {
        this.closeChat()
      }
      else {
        this.chatOpen = true
        this.chatbuttonText = 'Close chat lobby'
      }
      
   },
   closeMenu: function(){
    this.menubuttonText = 'Open menu'
    this.menuOpen = false

   },
   menuClick: function() {
      
      if (this.menuOpen) {
        this.closeMenu()
      }
      else {
        this.menubuttonText = 'Close menu'
        this.menuOpen = true

      }
      
   },
    suggestGame: function () {
      socket.emit('suggestGame', {pollId: this.pollId, deckName: this.selectedDeck, playerThatSuggested: this.name})
    },
    acceptGame: function (deckToAccept) {
      for (var i = 0, len = this.votedDecks.length; i < len; i++) {
        if (deckToAccept == this.votedDecks[i]) {
          return;
        }

      }
      this.votedDecks.push(deckToAccept) 
      console.log("acceptGame ran and the deck to accept was,", deckToAccept);
      socket.emit('acceptGame', {pollId: this.pollId, deckName: deckToAccept})

    },
    startGame: function () {
      socket.emit("startGame", {pollId: this.pollId, players: this.players});
    },
    seeQuestion: function () {
      if(!this.seeFlashcardBool){
        socket.emit("seeQuestion", {pollId: this.pollId});
        this.seeFlashcardBool = true;
      }
    },
    onClickChild: function (value) {
      this.questionPosition = value;
      console.log("parent has", this.questionPosition);
    },
    gameWasFinished: function () {
      const timeCongratsFade = 4000;
      this.hideNextButtons = false;
      this.clickableFlashcardBool = true;
      this.congratzMessage = true;
      setTimeout(() => this.congratzMessage = false, timeCongratsFade);
    },
    loadDeck: function (deckIdToLoad) {
      this.resetQuestionPosition = !this.resetQuestionPosition;
      console.log("loadDeck", this.resetQuestionPosition);
      const target = Decks.find(deck => deck.id === deckIdToLoad);
      this.myObj_deserialized = target;
      this.questionObject = this.myObj_deserialized;
      socket.emit("loadDeck", {pollId: this.pollId, deck: this.myObj_deserialized});
      this.showProgressBar = true;
    },
    sendMessage: function (messageToSend) {
        socket.emit("sendMessage", {pollId: this.pollId, message: messageToSend, player: this.name});
        this.newMessage = "";
        console.log("sendMessage ran");
    },
    async likeDeck (deckToLike) { //denna ska flyttas över till lobbyView
      console.log(deckToLike);
      try {
        const response = await axios.post('http://localhost:8080/likeDeck ', {
          data: deckToLike,
          headers:{
            'Content-Type': 'application/json'
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.socket = io();
    this.socket.on('requestReceive',inviteInformation => {
      this.inviteInformation.push(inviteInformation);
      this.inviteWatcher++;
    });
  },
  watch: {
    trueCount: function () {
      console.log("trueCount has changed");
      console.log("this is the trueCount:", this.trueCount);
      if (this.trueCount === this.trueValuesNeeded) {
        this.swapSides = true;
      }
      if (this.trueCount === 0) {
        this.swapSides = false;
      }
    },
    inviteWatcher: function(){
      console.log("inviteInformation is", this.inviteInformation)
      let listToFill = [];
      for (let i = 0, l = this.inviteInformation.length; i < l; i++) {
        let inviteInfo = this.inviteInformation[i];
        if(inviteInfo.receiver === this.name){
          console.log("receiver is me and im invited by ", inviteInfo.requester,
              "the lobby created is",inviteInfo.lobbyID);
          listToFill.push(inviteInfo);
          this.invitationList = listToFill;
        }
      }
    },
    suggestedDecksChanged: function () { //välidgt dåligt att göra såhär men jag behöver ett värde som uppdateras när suggestedDecks uppdateras
      for (let deck of this.suggestedDecks) {
        if (deck.votes === this.players.length) {
          this.loadDeck(deck.id);
          this.closeMenu()
          this.closeChat()
          this.suggestedDecks = [];
          this.votedDecks = [];
          this.startGame();
          this.showPressToSeeQuestion = true;
          this.hideNextButtons = true;
          this.clickableFlashcardBool = false;
          return;
        }
      }
    },
    players: function () {
      if (!this.haveReceivedName) {
        let initializePlayers = this.players;
        let lastElement = initializePlayers.slice(-1);
        this.name = lastElement[0];
        this.haveReceivedName = true;
      }
    }
  },
  computed: {
    trueCountProgress: function () {
      return this.trueCount / this.trueValuesNeeded * 100;
    }
  }
}
</script>


  <style scoped>
  nav {
    width:100%;
    height: 160px;
    display: grid;
    grid-template-rows: repeat(auto-fit, 7em);
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


  #wholeScreen{
    display: flex;
    flex-direction: column;
  }
  .playDiv {
    z-index: 0;
  }
  #belowGame{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 25px;
    height: 200px;
    width: 100%;
  }
  #wrapperDiv{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .chatBox{
    border: 5px ridge rgb(99, 151, 193);
    padding:10px;
    max-width: 30%;
    background-color: rgba(70, 131, 180, 0.941);
    z-index: 1;
    
  }
  .hiddenChatBox, .hiddenMenu {
    display:none;
  }
  
  .menu{
    border: 5px ridge rgb(48, 90, 124);
    padding:5px;
    background-color: rgba(70, 131, 180, 0.941);
    overflow: scroll;
    height:350px;
    user-select: none;
    width: 300px;
    
  }
  .placeHolder {
    height: 370px;
    width: 12.001rem;
  }
  #chatWindow{
    background-color: rgba(235, 251, 255, 0.836);
    height: 250px;
    width: 170px;
    border: none;
    
    
    white-space: pre-wrap;
  }

  @media screen and (max-width:60em) {
    .playingMenu {
      position: absolute;
      right: 0;
}
.playingChat {
  position: absolute;
  left:0;
}
  }
  @media screen and (max-width:50em) {



nav {
  
  position: relative;
  height:100vh;
  top: 2em;
  left: 0;
  width:95%;
  display: grid;
  grid-template-rows: repeat(auto-fit, 4em);
  transition: 1.5s;
}

nav ::v-slotted(a) {
  justify-content: left;
  padding-left: none;

}


}

  @media screen and (max-width:40em) {
    .chatBox {
      max-width: 80%;
    }
  }

  @media screen and (max-width:36em) {
    .playingMenu {
      position: absolute;
      right:auto;
}
.playingChat {
  position: absolute;
  left:auto;
}
  }

 
  @media screen and (max-width:32em) {
    #belowGame {
      
      
    }
    .chatBox {
     
      position: absolute;
    }
  }

  </style>
