  <template>
  <div>
    {{pollId}} {{players}} {{trueCount}} out of {{trueValuesNeeded}}<button @click="startGame"> Press this button to retrieve the game object</button>
  </div>
    <diV>
      <button @click="seeQuestion">Press here to update the </button>
    </diV>
    <div>
      <div id="selector"> {{selectorList}}
        <select  name="decks" required v-model="selectedDeck" @change="loadDeck(this.selectedDeck)" >
          <option value="" disabled selected hidden></option>
          <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{deck}}</option>
        </select>
      </div>
      <FlashcardComponent v-bind:questionProp="myObj_deserialized" @nextClick="onClickChild" @previousClick="onClickChild" ></FlashcardComponent>
    </div>

</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
import FlashcardComponent from "@/components/FlashcardComponent";
import AllDecks from "/Users/danielceoca/Desktop/projektGränssnitt/polly/src/assetts/AllDecks.json";
const socket = io();

let selectList = AllDecks;
const idListFromAllDecks = selectList.map(element => element.id);

export default {
  name: 'PollView',
  components: {
    FlashcardComponent,
  },
  data: function () {
    return {
      pollId: "inactive poll",
      questionObject: {"id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]},
      myObj_deserialized: {},
      players: [],
      trueValuesNeeded: 0,
      trueCount: 0,
      swapSides: false,
      selectedDeck: "",
      selectorList: idListFromAllDecks,
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
  },
  methods: {
    startGame: function () {
      socket.emit("startGame", {pollId: this.pollId, players: this.players});
    },
    seeQuestion: function () {
      socket.emit("seeQuestion", {pollId: this.pollId});
    },
    onClickChild: function(value){
      this.questionPosition = value;
      console.log("parent has", this.questionPosition);
    },
    loadDeck: function(deckIdToLoad){
      this.questionPosition = 0;
      const target = AllDecks.find(deck => deck.id === deckIdToLoad);
      console.log("target, should be",target);
      console.log("du klickade på en knapp med loadDeck()");
      this.myObj_deserialized = target;
      this.questionObject = this.myObj_deserialized;
    },
  },
  watch: {
    trueCount: function () {
      console.log("trueCount has changed");
      console.log("this is the trueCount:",this.trueCount);
      if(this.trueCount === this.trueValuesNeeded){
        console.log("trueCount is equal to trueValuesNeeded");
        this.swapSides = true;
        console.log("now swapsides should be:", this.swapSides);
        //det som egentligen ska ske här är att man ska emitta next card då alla svarat och att man ska resetta
        //counten för alla i rummet.
      }
    }
  }
}
</script>
