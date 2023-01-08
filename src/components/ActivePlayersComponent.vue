<template>
  <body>
  <br>
  <div>
    <ul style="list-style: none">
      <li v-for="invite in invitationList" v-bind:key="invite"> {{invite.requester}} Invites you to play {{invite.lobbyID}}
        <join-lobby-component v-bind:lobby-id="invite.lobbyID" v-bind:name="playerNickName" ></join-lobby-component>
      </li>
    </ul>
  </div>
    <!-- Här visas Active Player listan-->
  <p>
    <span> Players online</span> <button id="toggleActivePlayer" @click="seeFriendList"> Toggle</button>
  </p>
    <div id="verticalRight" v-if="expandPlayerList">
      <p style="font-size: 16px; font-weight: bold"> Active players</p>
      <ul style="list-style: none">
        <li v-for="player in filteredPlayers" v-bind:key="player">   <b>{{player.name}}</b>
          <button v-if="lobbyCreatedBool" @click="sendRequest(player.name)">Invite</button>
        </li>
      </ul>
    </div>




  </body>

</template>

<script>
import io from "socket.io-client";
import joinLobbyComponent from "@/components/JoinLobbyComponent";
const socket = io();

export default {
  name: "MultiplayerView",
  components: {
    joinLobbyComponent,
    //autoLogout
  },
  props: ["playerNickName",'uniqueLobbyID','lobbyCreatedBool'],
  data: function(){
    return {
      lang: "en",
      questionPosition: 0,
      totalQuestionAmount: 5,
      players: [],
      inviteInformation: [],
      invitationList: [],
      expandPlayerList: true,
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
        },
        createPoll: function () { //ett bättre namn hade varit createLobby, men jag är lat
          // this.lobbyId = Math.floor(Math.random() * 1000000 + 100000);
          socket.emit("createPoll", {pollId: this.uniqueLobbyID, lang: this.lang});
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
  font-size: 12px;
}
#toggleActivePlayer{
}
</style>