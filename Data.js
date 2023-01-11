'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.activePlayerList = [];
  this.inviteList = [];
  this.activeLobbies = [];
  setInterval( () => {
    this.currentCheck = Date.now();
  }, 3000);
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}
Data.prototype.activePlayers = function(name,statusOfActivity){
    this.activePlayerList.push({name:name,activityStamp:statusOfActivity});
}

Data.prototype.removePlayer = function(name){
  this.activePlayerList = this.activePlayerList.filter(player => player.name !== name);
}

Data.prototype.getActivePlayers = function(){
  for(let player of this.activePlayerList){
    console.log(player.activityStamp - this.currentCheck);
    if( Math.abs(player.activityStamp - this.currentCheck) > 10000){
      console.log("player is inactive", player.name);
        this.removePlayer(player.name);
    }
  }
    return this.activePlayerList;
}

Data.prototype.updateActivity = function(playerName, activityStamp){
  for (let player of this.activePlayerList){
    if (player.name === playerName){
      player.activityStamp = activityStamp;
    }
  }
  return this.activePlayerList;
}




Data.prototype.updateScore = function(name,number){
   for(let i = 0; i < this.activePlayerList.length; i++){
        if(this.activePlayerList[i].name == name){
            this.activePlayerList[i].score = number;
        }
    }
}
Data.prototype.appendInviteList = function(inviteObject){
  this.inviteList.push(inviteObject);
}
Data.prototype.getInviteList = function(){
    return this.inviteList;
}
Data.prototype.appendLobbies = function(lobbyObject){
    this.activeLobbies.push(lobbyObject);
}
Data.prototype.updateLobbies = function(name, pollId){
  const playerToAdd = name;
  const lobbyToJoin = pollId;
  for (let lobby of this.activeLobbies){
    if (lobby.lobbyID == lobbyToJoin){
      lobby.playersInLobby.push(playerToAdd);
    }
  }
}
Data.prototype.getAllLobbies = function(){
    return this.activeLobbies;
}
Data.prototype.getLobbyParticipants = function(searchLobbyID){
  for (let lobby of this.activeLobbies){
    if (lobby.lobbyID == searchLobbyID){
      return lobby.playersInLobby;
    }
  }
}
Data.prototype.startGame = function(players) {
  let totalTrueValuesNeeded = players.length;
  return totalTrueValuesNeeded;
}

module.exports = Data;



