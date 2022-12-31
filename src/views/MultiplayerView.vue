<template>
  <body>
  <div>
    {{inviteInformation}}
  </div>
  <div v-if="!joinedBoolean">
    <p  style="font-size: 30px; font-weight: bolder"> CHOOSE YOUR NAME</p>
    <input v-model="name" type="text" />
    <button @click="startPlaying" > Start playing! </button>
  </div>
  <div id="wrapperDiv" v-if="joinedBoolean">
    <div id="horizontalContent">{{name}}

      <div id="selector">
        <select  name="decks" required v-model="selectedDeck" @change="loadDeck(this.selectedDeck)" >
          <option value="" disabled selected hidden></option>
          <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{deck}}</option>
        </select>
      </div>


      <div>
        <FlashcardView v-bind:questionProp="myObj_deserialized" @nextClick="onClickChild" @previousClick="onClickChild" ></FlashcardView>
      </div>

      <div style="background-color: white">
        <label>
          Write poll id:
          <input type="text" v-model="lobbyId">
        </label>
        <router-link
            v-bind:to="'/poll/'+lobbyId"
        >
          <button id="shadow"
                  @click="joinLobby"
          >
            Participate
          </button>
        </router-link>
      </div>

    </div>

    <div id="verticalRight">
      <p style="justify-content: center; font-size: 30px; font-weight:bold"> Players</p>
      <ul style="list-style: none">
        <li v-for="player in players" v-bind:key="player"> {{player.name}} ,
          Points {{player.score}} out of {{totalQuestionAmount}} <button @click="sendRequest(player.name)" > Send request</button> </li>
      </ul>
    </div>

  </div>

  </body>

</template>

<script>
import Decks from "../assetts/Decks.json";
let selectList = AllDecks;
const idListFromAllDecks = selectList.map(element => element.id);

import io from "socket.io-client";
import FlashcardView from "@/components/FlashcardComponent";
import AllDecks from "@/assetts/AllDecks.json";
const socket = io();
console.log(Decks);
export default {
  name: "MultiplayerView",
  components: {
    FlashcardView
  },
  data: function(){
    return {
      lang: "en",
      lobbyId: 1000000,
      name: "",
      questionPosition: 0,
      totalQuestionAmount: 5,
      players: [],
      inviteInformation: [],
      joinedBoolean: false,
      myObj_deserialized: {},
      questionObject:   {"id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]},
      selectedDeck: "",
      selectorList: idListFromAllDecks
    }
  },
  created: function() {
    this.myObj_deserialized = this.questionObject;
    socket.on("multiplayerViewUpdate", playersActive => {
      this.players = playersActive;
    });
    /*socket.on("requestReceive", inviteInformation => {
      this.inviteInformation = inviteInformation;
    });*/
  },
  methods:
      {
        startPlaying: function(){
          this.joinedBoolean = true;
          socket.emit("startPlaying", {name: this.name, score: this.questionIndex});
        },
        onClickChild: function(value){
          this.questionPosition = value;
          console.log("parent has", this.questionPosition);
          socket.emit("numberProgress", {name: this.name, score: this.questionPosition});
        },
        sendRequest: function(playerToRequest){
          this.createPoll();
          socket.emit('playRequest', {
            requester: this.name,
            receiver: playerToRequest,
            lobbyID: this.lobbyId
          });
          socket.emit('lobbyObject', {
            lobbyID: this.lobbyId,
            playersInLobby: []
          });
        },
        createPoll: function () { //ett bättre namn hade varit createLobby, men jag är lat
          this.lobbyId = Math.floor(Math.random()*1000000 + 100000);
          socket.emit("createPoll", {pollId: this.lobbyId, lang: this.lang });
        },
        joinLobby: function(){
          socket.emit("joinLobby", {lobbyID: this.lobbyId, name: this.name});
          this.navigate();
        },
        loadDeck: function(deckIdToLoad){
          this.questionPosition = 0;
          const target = AllDecks.find(deck => deck.id === deckIdToLoad);
          console.log("target, should be",target);
          console.log("du klickade på en knapp med loadDeck()");
          this.myObj_deserialized = target;
          this.questionObject = this.myObj_deserialized;
          }
      },
  watch: {
    inviteInformation: function(){
      console.log("inviteInformation is", this.inviteInformation)
      for (var i = 0, l = this.inviteInformation.length; i < l; i++) {
        var inviteInfo = this.inviteInformation[i];
        if(inviteInfo.receiver === this.name){
          console.log("receiver is me and im invited by ", inviteInfo.requester,
              "the lobby created is",inviteInfo.lobbyID);
        }
      }
    }
  },
  mounted() {
    this.socket = io();
    this.socket.on('requestReceive',inviteInformation => {
      this.inviteInformation = inviteInformation;
    });
  }
}
</script>

<style scoped>
#wrapperDiv{
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
}
#horizontalContent{
  flex: 1;
  overflow: auto;
}
#verticalRight{
  width: 200px;
  max-width: 30%;
  border: 1px solid black;
}

/* CSS för knapparna likes och comments:
#Likes {
  padding: 10px 40px;
}

#Comments{
  padding: 10px 40px;
}
 */

</style>