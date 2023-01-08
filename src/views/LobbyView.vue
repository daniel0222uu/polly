  <template>


    <div id="wholeScreen">
      <progress-bar-component v-bind:progress="trueCountProgress"></progress-bar-component>
      {{trueCount}} out of {{trueValuesNeeded}} wants to see the question
      <div id="playersActive">
      </div>
    <div id="wrapperDiv">

      <div id="leftVertical">
        Players in lobby: <span v-for="player in players" v-bind:key="player" > {{player}} ,  </span>
        <div>


          <p> Chat</p>
          <textarea id="chatWindow" readonly  v-model="messages">
        </textarea>
          <p>
            <input v-model="newMessage"/>
            <button @click="sendMessage(newMessage)">Send</button></p>
        </div>

      </div>

      <div id="middleContent">

        <FlashcardComponent v-bind:questionProp="myObj_deserialized" v-bind:show-answer="swapSides"
                            v-bind:poll-id="pollId" v-bind:coop-multiplayer="hideNextButtons" v-bind:deck-loaded="resetQuestionPosition"
                            v-bind:disable-click="clickableFlashcardBool"
                            @nextClick="onClickChild" @previousClick="onClickChild" @gameFinished="gameWasFinished"
        ></FlashcardComponent>

      </div>

      <div id="rightVertical">

        <div>
          <br>
          <button style="" @click="suggestGame"> Suggest to play this deck</button>
          <select  name="decks" required v-model="selectedDeck" >
            <option value="" disabled selected hidden></option>
            <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{deck}}</option>
          </select>
        </div>
        <ul>
          <li v-for="deck in suggestedDecks" v-bind:key="deck"> <b>{{deck.id}}</b>  was suggested for co-op, votes {{deck.votes}} / {{players.length}}
            <button @click="acceptGame(deck.id)">Accept</button> </li>
        </ul>
        <br>


        <ActivePlayersComponent v-bind:player-nick-name="name" v-bind:uniqueLobbyID="pollId"
                                v-bind:lobby-created-bool="lobbyCreatedBool"
        ></ActivePlayersComponent>

      </div>



    </div>

    <div id="belowGame">


      <div>
        <button v-if="showPressToSeeQuestion" style="width: 100px; height: 70px;" @click="seeQuestion">Press here when you want to see the question </button>
      </div>

    </div>


    </div>

</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
import FlashcardComponent from "@/components/FlashcardComponent";
import ActivePlayersComponent from "@/components/ActivePlayersComponent";
import Decks from "@/assetts/Decks.json";
import ProgressBarComponent from "@/components/ProgressBarComponent";
const socket = io();

let selectList = Decks;
const idListFromAllDecks = selectList.map(element => element.id);

export default {
  name: 'LobbyView',
  components: {
    FlashcardComponent,
    ActivePlayersComponent,
    ProgressBarComponent
  },
  data: function () {
    return {
      lobbyCreatedBool: true,
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
      this.suggestedDecks.push(objectToPush);
      this.suggestedDecksChanged++;
    })
    socket.on('gameAccepted', deckToUpdateVoteCount => {
      console.log("gameAccepted received on the client side");
      let deckName = deckToUpdateVoteCount;
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
    suggestGame: function () {
      socket.emit('suggestGame', {pollId: this.pollId, deckName: this.selectedDeck, playerThatSuggested: this.name})
    },
    acceptGame: function (deckToAccept) {
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
      this.hideNextButtons = false;
      this.clickableFlashcardBool = true;
    },
    loadDeck: function (deckIdToLoad) {
      this.resetQuestionPosition = !this.resetQuestionPosition;
      console.log("loadDeck", this.resetQuestionPosition);
      const target = Decks.find(deck => deck.id === deckIdToLoad);
      this.myObj_deserialized = target;
      this.questionObject = this.myObj_deserialized;
      socket.emit("loadDeck", {pollId: this.pollId, deck: this.myObj_deserialized});
    },
    sendMessage: function (messageToSend) {
        socket.emit("sendMessage", {pollId: this.pollId, message: messageToSend, player: this.name});
        this.newMessage = "";
        console.log("sendMessage ran");
    }
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
    suggestedDecksChanged: function () { //välidgt dåligt att göra såhär men jag behöver ett värde som uppdateras när suggestedDecks uppdateras
      for (let deck of this.suggestedDecks) {
        if (deck.votes === this.players.length) {
          this.loadDeck(deck.id);
          this.suggestedDecks = [];
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

  #playersActive{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  #wholeScreen{
    display: flex;
    flex-direction: column;
  }
  #belowGame{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40px;
    height: 200px;
    width: 100%;
  }
  #wrapperDiv{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  #leftVertical{
  }
  #middleContent{
  }
  #rightVertical{
    height: 400px;
    width: 300px;
  }
  #chatWindow{
    height: 300px;
    width: 150px;
    border: 1px solid black;
    overflow: scroll;
    white-space: pre-wrap;
  }

  </style>
