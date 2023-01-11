<template>


  <div id="toggleActivePlayer">
    <div>
    </div>
    <div>
      <button id="toggleButton" @click="expandPlayerList=!expandPlayerList">

        <img style="width: 40px; height: 30px;"
             src="http://localhost:8080/img/showActivePlayers.png">
      </button>
    </div>
  </div>

  <div id="verticalRight" v-if="expandPlayerList">
    <div v-if="!inLobby">


    <p v-if="inviteSentBool">
      <join-lobby-component v-bind:lobby-id="uniqueLobbyID"
                            v-bind:name="playerNickName"
      ></join-lobby-component>
    </p>
    </div>
    <ul id="playerList">
      <li v-for="player in filteredPlayers" v-bind:key="player" ><b>{{ player.name }}</b>

        <span v-if="!isPlayerInvited(player.name)">
        <button v-if="!inLobby" style="
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

           @click="sendRequest(player.name),inviteSentLocal=true"> Invite </button> </span>
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
  props: ["playerNickName", 'uniqueLobbyID','inLobby'],
  data: function () {
    return {
      lang: "en",
      questionPosition: 0,
      totalQuestionAmount: 5,
      players: [],
      inviteInformation: [],
      invitationList: [],
      expandPlayerList: true,
      inviteSentBool: false,
      playersInvited: [],
    }
  },
  created: function () {
    socket.on("multiplayerViewUpdate", playersActive => {
      this.players = playersActive;
    });
  },
  methods:
      {
        sendRequest: function (playerToRequest) {
          let invitedObjectToAppend = {name: playerToRequest, invited: true};
          this.playersInvited.push(invitedObjectToAppend);
          this.createPoll();
          socket.emit('playRequest', {
            requester: this.playerNickName,
            receiver: playerToRequest,
            lobbyID: this.uniqueLobbyID
          });
          socket.emit('lobbyObject', {
            lobbyID: this.uniqueLobbyID,
            playersInLobby: []
          });
          this.inviteSentBool = true;
        },
        createPoll: function () {
          socket.emit("createPoll", {pollId: this.uniqueLobbyID, lang: this.lang});
        },
        isPlayerInvited: function(nameToCheck) {
          for (let i = 0; i < this.playersInvited.length; i++) {
            if (this.playersInvited[i].name === nameToCheck) {
              return true;
            }
          }
        }
      },
  watch: {
    inviteInformation: function () {
      let listToFill = [];
      for (let i = 0, l = this.inviteInformation.length; i < l; i++) {
        let inviteInfo = this.inviteInformation[i];
        if (inviteInfo.receiver === this.name) {
          console.log("receiver is me and im invited by ", inviteInfo.requester,
              "the lobby created is", inviteInfo.lobbyID);
          listToFill.push(inviteInfo);
          this.invitationList = listToFill;
        }
      }
    },
    lobbyViewEntered: function () {
      this.expandPlayerList = false;
      console.log("lobbyViewEntered is", this.lobbyViewEntered)
    }
  },
  mounted() {
    this.socket = io();
    this.socket.on('requestReceive', inviteInformation => {
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
#verticalRight {
  width: 250px;
  height: 600px;
  overflow: auto;
  font-size: 18px;
  text-align: start;
}

#toggleActivePlayer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

#toggleButton {
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
}

#playerList {
  list-style:square;
}
@media screen and (max-width:60em) {
  #verticalRight {
    font-size: 15px;
  }
  
}
@media screen and (max-width:40em) {
  #verticalRight {
    font-size: 13px;
  }
  
}
@media screen and (max-width:30em) {
  #verticalRight {
    font-size: 12px;
  }
  
}

</style>