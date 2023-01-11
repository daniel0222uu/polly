<template>
  <body>

     <!-- Här fyller användaren i namn och väljer att starta spelet -->
     
     <div style="margin-top:100px; ;"  v-if="!joinedBoolean">
      
      <p>
      <input style="padding:5px" v-model="name" type="text" placeholder="Enter your name">
      </p>
      <button style="
        background-color: #fec89a;
        border: solid black;
        color: black;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        font-family: 'Kanit', sans-serif;
        margin: 4px 2px;
        cursor: pointer;
        webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        border-radius: 15px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);"
        @click="startPlaying">Start playing!</button>
    </div>
     <!-- v-bind:lobby-created="lobbyCreated" -->
  <!-- Här visas meddelande om att det finns en invite -->
    <div>
    <ul style="list-style: none">
      <li v-for="invite in invitationList" v-bind:key="invite"> {{invite.requester}} Invites you to play {{invite.lobbyID}}
        <join-lobby-component v-bind:lobby-id="invite.lobbyID" v-bind:name="name"  ></join-lobby-component>
        
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
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);" @click="declineInvite(invite.requester)" > Decline</button>
      </li>
    </ul>
    </div>

 

  <!-- Här startar div som visas när joinedBoolean=True -->
    <div class="wrapperDiv" v-if="joinedBoolean">

      <div class="bannerDiv" >
        <div class="nameAndQuitDiv">
        <p style="font-size:24px;font-weight:bold">
            {{name}}
          <button style="
            background-color: #fec89a;
            border: solid black;
            color: black;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            font-family: 'Kanit', sans-serif;
            margin: 4px 2px;
            cursor: pointer;
            webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
            border-radius: 15px;
            box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);" @click="exitPlaying">Quit game</button>
        </p>

        

      </div>
      
    </div>

      <div class="mainContent">
        <div class="infoFlashcard">

<h3 >{{instantiateuiLabels.welcomeToMultiplayer}}</h3>
<p>{{instantiateuiLabels.startByInviting}}</p>
<p>{{instantiateuiLabels.suggestAndVote}}</p>
<p>{{instantiateuiLabels.whenEveryoneReady}}</p>
<p>{{instantiateuiLabels.goodLuck}}</p>

<!--
  Välkommen till Multiplayer!
    Bjud in spelare och anslut till lobbyn.
  Föreslå och rösta på en kortlek och utmana din medspelare.
  När alla är redo kommer svaret att visas i några sekunder och därefter visas nästa fråga.
  Lycka till!
-->

</div>
<div class="activePlayerList" >
        
        <ActivePlayersComponent v-if="expandPlayerList"
                                v-bind:player-nick-name="name" v-bind:uniqueLobbyID="lobbyId"

        ></ActivePlayersComponent>
      </div>

      </div> <!--   v-bind:lobby-created-bool="lobbyCreatedBool"  denna som skapa massa errors.-->


      </div>
  
  </body>

</template>

<script>


import Decks from "../assetts/Decks.json";
let selectList = Decks;
const idListFromAllDecks = selectList.map(element => element.id);

import io from "socket.io-client";

import joinLobbyComponent from "@/components/JoinLobbyComponent";
import ActivePlayersComponent from "@/components/ActivePlayersComponent";

// Här importeras componentern AutoLogout
//import autoLogout from "@/components/AutoLogout";

import axios from "axios";
const socket = io();

export default {
  name: "MultiplayerView",
  components: {
   
    joinLobbyComponent,
    ActivePlayersComponent,
    //autoLogout
  },
  inject: ['uiLabels'],
  data: function(){
    return {
      lang: "en",
      lobbyId: 1337,
      name: "",
      players: [],
      inviteWatcher: 0,
      inviteInformation: [],
      joinedBoolean: false,
      invitationList: [],
      lobbyCreatedBool: false,
      expandPlayerList: true,
      hintString: "",
      seeCommentsBool: false,
      selectorList: idListFromAllDecks,
      instantiateuiLabels: this.uiLabels
    }
  },
  created: function() {
    this.lobbyId = Math.floor(Math.random() * 1000000 + 100000);
    socket.on("multiplayerViewUpdate", playersActive => {
      this.players = playersActive;
    });
    setInterval( () => {
      socket.emit("playerActive", {name: this.name, activityStamp: Date.now()});
    }, 1000);
    },
  methods:
      {
        startPlaying: function () {
          this.joinedBoolean = true;
          socket.emit("startPlaying", {name: this.name, activityStamp: Date.now()});
        },
        exitPlaying: function () {
          this.joinedBoolean = false;
          socket.emit("exitPlaying", {name: this.name});
        },
        declineInvite: function (requesterToFilter) {
          console.log("declineInvite");
          for(let invite of this.invitationList){
            if(invite.requester === requesterToFilter){
              this.invitationList = this.invitationList.filter(invite => invite.requester !== requesterToFilter);
            }
          }
        },
        loadDeck: function (deckIdToLoad) {
          this.questionPosition = 0;
          const target = Decks.find(deck => deck.id === deckIdToLoad);
          console.log("target, should be", target);
          console.log("du klickade på en knapp med loadDeck()");
          this.myObj_deserialized = target;
          this.questionObject = this.myObj_deserialized;
        },
     /*   finishGame: function () {
          this.gameFinishedBoolean = true;
        }, */
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
        async commentDeck (deckToComment, commentToSend) { //denna ska flyttas över till lobbyView
          let objectToAppend = {
            name: this.name,
            hint: commentToSend,
            questionPosition: this.questionPosition,
            likes: 0,
          };
          try {
            const response = await axios.post('http://localhost:8080/commentDeck ', {
              data: deckToComment,
              comment: objectToAppend,
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
    inviteWatcher: function(){
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
      this.inviteInformation.push(inviteInformation);
      this.inviteWatcher++;
    });
  },
}
</script>

<style scoped>

.wrapperDiv{
  

  display: flex;
  flex-direction: column;
  
 
  
}
.bannerDiv {
  width:100%; 
  display: flex; 
  justify-content: space-evenly;
  align-items: center;
}
.mainContent {
 width: 100%; 
 display: flex; 
 justify-content: space-evenly;
 
}


.activePlayerList{
  border: 5px ridge rgb(48, 90, 124);
  background-color: rgba(70, 131, 180, 0.941);
 
  height: 420px;
  overflow: scroll;
  overflow-x: hidden;
  width: 250px;
}
.nameAndQuitDiv {
 
 display: flex;
 flex-direction: column;
 justify-content: space-evenly;
 align-items: center;
 width:200px;
 
  
  
  
}


.viewAfterGame {
  
  font-size: 24px;
  text-align: left;
	background-color: white;
	margin-left: 300px;
	width: 600px;
  border-radius: 10px;
  padding: 10px;
}

.likeButton {
  height: 40px;
  width: 50px;
  margin-bottom: 20px;
}


.infoFlashcard {
  
  background-color: rgba(70, 131, 180, 0.941);
  height: 400px;
  text-align: center;
  width: 40%;
  
  
  border: 5px ridge rgb(99, 151, 193);
  padding: 30px;
  font-family: Kanit;
  font-size: 20px;
  
  
}
@media screen and (max-width: 42em) {
  .infoFlashcard{
    font-size: 14px;
  }

}

@media screen and (max-width: 30em) {
  .mainContent{
    flex-direction: column-reverse;
    
    align-items: center;
  }
  .infoFlashcard{
    width: 70%;
  }

  .actionButton {
        background-color: #fec89a;
        border: solid black;
        color: black;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        font-family: 'Kanit', sans-serif;
        margin: 4px 2px;
        cursor: pointer;
        webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        border-radius: 15px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
  }
}
</style>