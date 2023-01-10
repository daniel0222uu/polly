<template>


  <div id="toggleActivePlayer"  >
    <div>
      <span> Active players</span>
    </div>
    <div>
      <button id="toggleButton" @click="expandPlayerList=!expandPlayerList">

      <img style="width: 40px; height: 30px;"
           src="http://localhost:8080/img/showActivePlayers.png">
      </button>
    </div>
  </div>

  <div id="verticalRight" v-if="expandPlayerList">
    <p v-if="inviteSentBool">
      <join-lobby-component v-bind:lobby-id="uniqueLobbyID"
                            v-bind:name="playerNickName"
      ></join-lobby-component>
    </p>
      <ul id="playerList">
        <li v-for="player in filteredPlayers" v-bind:key="player">   <b>{{player.name}}</b>
          <button @click="sendRequest(player.name)">Invite</button>
        </li>
      </ul>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io();
import JoinLobbyComponent from "@/components/JoinLobbyComponent";

export default {
  name: "MultiplayerView",
  components: {
    JoinLobbyComponent
  },
  props: ["playerNickName",'uniqueLobbyID',],
  data: function(){
    return {
      lang: "en",
      questionPosition: 0,
      totalQuestionAmount: 5,
      players: [],
      inviteInformation: [],
      invitationList: [],
      expandPlayerList: true,
      inviteSentBool: false,
    }
  },
  created: function() {
    socket.on("multiplayerViewUpdate", playersActive => {
      this.players = playersActive;
    });
  },
  methods:
      {
        // Testar att lägga till funktion för att ta bort spelare
        exitPlaying: function (playerName) {
          this.joinedBoolean = false;
          socket.emit("exitPlaying", {name: playerName});
          console.log("exitPLaying should've ran");
        },
        seeFriendList: function () {
          this.expandPlayerList = !this.expandPlayerList;
        },
        onClickChild: function (value) {
          this.questionPosition = value;
          console.log("parent has", this.questionPosition);
          socket.emit("numberProgress", {name: this.name, score: this.questionPosition});
        },
        sendRequest: function (playerToRequest) {
          this.createPoll();
          socket.emit('playRequest', {
            requester: this.playerNickName ,
            receiver: playerToRequest,
            lobbyID: this.uniqueLobbyID
          });
          socket.emit('lobbyObject', {
            lobbyID: this.uniqueLobbyID,
            playersInLobby: []
          });
          this.inviteSentBool = true;
        },
        createPoll: function () { //ett bättre namn hade varit createLobby, men jag är lat
          // this.lobbyId = Math.floor(Math.random() * 1000000 + 100000);
          socket.emit("createPoll", {pollId: this.uniqueLobbyID, lang: this.lang});
        },
      },
  watch: {
    inviteInformation: function(){
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
    lobbyViewEntered: function(){
        this.expandPlayerList = false;
        console.log("lobbyViewEntered is", this.lobbyViewEntered)
    }
  },
  mounted() {
    this.socket = io();
    this.socket.on('requestReceive',inviteInformation => {
      this.inviteInformation = inviteInformation;
    });
  },
  computed: {
    filteredPlayers: function () {
      return this.players.filter(player => player.name != this.playerNickName);
    },
  },
}
</script>

<style scoped>
#verticalRight{
  width: 250px;
  height: 600px;
  overflow: auto;
  font-size: 18px;
  text-align: start;
}
#toggleActivePlayer{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
#toggleButton{
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
}
#playerList{
  list-style: georgian inside;
}
</style>