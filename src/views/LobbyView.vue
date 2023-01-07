  <template>


    <div id="wholeScreen">

      <div id="playersActive">
        <div>
          Your own player name should display here: {{name}}
          <br>
          <button style="" @click="suggestGame"> Suggest to play this deck</button>
          <select  name="decks" required v-model="selectedDeck" >
            <option value="" disabled selected hidden></option>
            <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{deck}}</option>
          </select>
          <p>{{trueCount}} out of {{trueValuesNeeded}} wants to see the question</p>
        </div>
      </div>
    <div id="wrapperDiv">

      <div id="leftVertical">
        Players
          <ul>
            <li v-for="player in players" v-bind:key="player"> {{player}} </li>
          </ul>
      </div>

      <div id="middleContent">

        <div id="selector">

        </div>
        <FlashcardComponent v-bind:questionProp="myObj_deserialized" v-bind:show-answer="swapSides"
                            v-bind:poll-id="pollId" v-bind:coop-multiplayer="hideNextButtons" v-bind:deck-loaded="resetQuestionPosition"
                            @nextClick="onClickChild" @previousClick="onClickChild" ></FlashcardComponent>

      </div>

      <div id="rightVertical">

        <ul>
          <li v-for="deck in suggestedDecks" v-bind:key="deck"> <b>{{deck.id}}</b>  was suggested for co-op, votes {{deck.votes}} / {{players.length}}
            <button @click="acceptGame(deck.id)">Accept</button> </li>
        </ul>
        <br>

        <textarea styl>
          Chatbox
        </textarea>



      </div>



    </div>

    <div id="belowGame">

      <button style="width: 100px; height: 60px;" @click="seeQuestion">Press here to update the </button>
    </div>


    </div>

</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
import FlashcardComponent from "@/components/FlashcardComponent";
import Decks from "@/assetts/Decks.json";
const socket = io();

let selectList = Decks;
const idListFromAllDecks = selectList.map(element => element.id);

export default {
  name: 'LobbyView',
  components: {
    FlashcardComponent,
  },
  data: function () {
    return {
      name: "",
      haveReceivedName: false,
      pollId: "inactive poll",
      questionObject: {
        "id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]
      },
      myObj_deserialized: {},
      players: [],
      trueValuesNeeded: 0,
      trueCount: 0,
      swapSides: false,
      selectedDeck: "",
      selectorList: idListFromAllDecks,
      hideNextButtons: true,
      resetQuestionPosition: false,
      suggestedDecks: [],
      suggestedDecksChanged: 0,
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
      socket.emit("seeQuestion", {pollId: this.pollId});
    },
    onClickChild: function (value) {
      this.questionPosition = value;
      console.log("parent has", this.questionPosition);
    },
    loadDeck: function (deckIdToLoad) {
      this.resetQuestionPosition = !this.resetQuestionPosition;
      console.log("loadDeck", this.resetQuestionPosition);
      const target = Decks.find(deck => deck.id === deckIdToLoad);
      this.myObj_deserialized = target;
      this.questionObject = this.myObj_deserialized;
      socket.emit("loadDeck", {pollId: this.pollId, deck: this.myObj_deserialized});
    },
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
  }
}
</script>


  <style scoped>
  #leftVertical{
    width: 100px;
    height: 100%;
  }
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
    margin-top: 40px;
    height: 200px;
    width: 100%;
  }
  #wrapperDiv{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  #middleContent{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #rightVertical{
    width: 200px;
    height: 100%;
  }

  </style>
