<template>


  <body>
  <div>

  </div>
  <div id="wrapperDiv">
    <div id="horizontalContent">

      <p  style="font-size: 30px; font-weight: bolder"> CHOOSE YOUR NAME</p>
      <div v-if="!joinedBoolean">
      <input v-model="name" type="text" />
        <button @click="startPlaying" > Start playing! </button>
      </div>
      <div>
        <FlashcardView v-bind:questionProp="myObj_deserialized" @nextClick="onClickChild" @previousClick="onClickChild" ></FlashcardView>
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
import io from "socket.io-client";
import FlashcardView from "@/views/FlashcardView";
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
      pollId: "123",
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
    }
  },
  created: function() {
    this.myObj_deserialized = this.questionObject;
    socket.on("dataUpdate", playersActive => {
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
      socket.emit('playRequest', {
        requester: this.name,
        receiver: playerToRequest
      });

    }
  },
  watch: {
    inviteInformation: function(){
      console.log("inviteInformation is", this.inviteInformation)
      for (var i = 0, l = this.inviteInformation.length; i < l; i++) {
        var inviteInfo = this.inviteInformation[i];
        console.log(inviteInfo.requester);
        console.log(inviteInfo.receiver);
        if(inviteInfo.receiver === this.name){
          console.log("receiver is me and im invited by ", inviteInfo.requester);
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


</style>