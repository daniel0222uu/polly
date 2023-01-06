<template>
  <body>
  <!-- Här visas text om autoLogout-->
  <!--<div><autoLogout></autoLogout></div>-->
  
  <!-- Här visas meddelande om att det finns en invite -->
    <div>
      {{inviteInformation}}
    <ul style="list-style: none">
      <li v-for="invite in invitationList" v-bind:key="invite"> {{invite.requester}} Invites you to play {{invite.lobbyID}}
        <join-lobby-component v-bind:lobby-id="invite.lobbyID" v-bind:name="name" ></join-lobby-component>
      </li>
    </ul>
    </div>

  <!-- Här fyller användaren i namn och väljer att starta spelet -->
    <div v-if="!joinedBoolean">
      <p style="font-size: 30px; font-weight: bolder">Enter your name:</p>
      <input v-model="name" type="text" />
      <button @click="startPlaying">Start playing!</button>
    </div>

  <!-- Här startar div som visas när joinedBoolean=True -->
    <div id="wrapperDiv" v-if="joinedBoolean">

    <!-- Här visas namn och användaren kan välja decka att spela-->
      <div id="horizontalContent"><p style="font-size:24px;font-weight:bold">{{name}}</p>
        <div id="selector">Choose deck to play:
          <select name="decks" required v-model="selectedDeck" @change="loadDeck(this.selectedDeck)">
            <option value="" disabled selected hidden></option>
            <option id="deckSelector" v-for="deck in selectorList" v-bind:key="deck">{{deck}}</option>
          </select>
        </div>
      <!--</div>-->
        <!-- Buttons for liking and commenting -->
        <div class="buttons">
          <button id = "likeButton" v-on:click="likeDeck(questionObject.id)">
            <img src="https://freesvg.org/img/Thumbs-Up-Silhouette.png" style="width: 30px; height: 30px;"/>
          </button>
        </div>
    <!-- Här visas komponenten FlashcardView -->
      <div v-if="joinedBoolean">
        <p><FlashcardView v-bind:questionProp="myObj_deserialized" @nextClick="onClickChild" @previousClick="onClickChild" ></FlashcardView></p>
        <button id="FinishGame" @click="finishGame()">Done!</button>
      </div>



        <div id="viewAfterGame" v-if="gameFinishedBoolean">
          <img src="http://localhost:8080/img/score-icon-21.jpeg" width="100" height="100">
          <P>Congratulation, {{name}}! Well done!</P>
          <P>Your score is: {{score}} points out of {{totalQuestionAmount}}</P>
          <p>Do you want to challange another player? Select one player from the list below and then click "Challange"!</p>
          <form @submit="sendRequest(selectedPlayer)">
            <div v-for="player in players" v-bind:key="player">
              <input type="radio" name="player" v-model="selectedPlayer">  {{player.name}}</div>
            <button type="submit">Challange now!</button>
          </form>
          <P><button @click="exitPlaying(name)">I want to exit the game</button></P>
        </div>

    </div> 

     <!-- Här avslutas allt som visas när joinBolean=True -->

     <!-- Här visas info när användaren spelat klart och klickat Done -->

      <!-- Här visas Active Player listan-->
      <div id="verticalRight">
        <p style="justify-content: left; font-size: 24px; font-weight:bold">Active players</p>
        <ul style="list-style: none">
          <li><b>{{name}}</b><br>
            <button @click="exitPlaying(name)">Exit game</button><br>
            <p>--------------</p></li>
          <li v-for="player in players" v-bind:key="player"> <b>{{player.name}}</b><br>
            {{player.score}} points out of {{totalQuestionAmount}}<br>
            <button @click="sendRequest(player.name)">Ask to join</button>
            <p>--------------</p></li>
        </ul>
      </div>
    
    </div>



   <!-- </div>-->
  
  </body>

</template>

<script>


import Decks from "../assetts/Decks.json";
let selectList = Decks;
const idListFromAllDecks = selectList.map(element => element.id);

import io from "socket.io-client";
import FlashcardView from "@/components/FlashcardComponent";
import joinLobbyComponent from "@/components/JoinLobbyComponent";

// Här importeras componentern AutoLogout
// import autoLogout from "@/components/AutoLogout";

import axios from "axios";
const socket = io();
console.log(Decks);

export default {
  name: "MultiplayerView",
  components: {
    FlashcardView,
    joinLobbyComponent,
    // autoLogout
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
      invitationList: [],
      gameFinishedBoolean: false,

      //buttons: 0,

      selectorList: idListFromAllDecks
    }
  },
  created: function() {
    this.lobbyId = Math.floor(Math.random() * 1000000 + 100000);
    this.myObj_deserialized = this.questionObject;
    socket.on("multiplayerViewUpdate", playersActive => {
      this.players = playersActive;
    });
    },
  methods:
      {
        startPlaying: function () {
          this.joinedBoolean = true;
          socket.emit("startPlaying", {name: this.name, score: this.questionIndex});
        },
        
        // Testar att lägga till funktion för att ta bort spelare
        exitPlaying: function (playerName) {
          this.joinedBoolean = false;
          socket.emit("exitPlaying", {name: playerName});
          console.log("exitPLaying should've ran");
        },
        onClickChild: function (value) {
          this.questionPosition = value;
          console.log("parent has", this.questionPosition);
          socket.emit("numberProgress", {name: this.name, score: this.questionPosition});
        },
        sendRequest: function (playerToRequest) {
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
         // this.lobbyId = Math.floor(Math.random() * 1000000 + 100000);
          socket.emit("createPoll", {pollId: this.lobbyId, lang: this.lang});
        },
        loadDeck: function (deckIdToLoad) {
          this.questionPosition = 0;
          const target = Decks.find(deck => deck.id === deckIdToLoad);
          console.log("target, should be", target);
          console.log("du klickade på en knapp med loadDeck()");
          this.myObj_deserialized = target;
          this.questionObject = this.myObj_deserialized;
        },
        finishGame: function () {
          this.gameFinishedBoolean = true;
        },

        // Function for the like button
        async likeDeck (deckToLike) {
          console.log("Number of likes:");
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

  watch: {
    inviteInformation: function(){
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
    }
  },
  mounted() {
    this.socket = io();
    this.socket.on('requestReceive',inviteInformation => {
      this.inviteInformation = inviteInformation;
    });
  },
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
  width: 250px;
  max-width: 30%;
  border: 5px solid black;
  border-radius: 10px;
  background-color: lightgrey;
}

#viewAfterGame {
  font-size: 24px;
  text-align: left;
	background-color: white;
	margin-left: 300px;
	width: 600px;
  border-radius: 10px;
  padding: 10px;
}

#likeButton {
  height: 40px;
  width: 50px;
  margin-bottom: 20px;
}



</style>