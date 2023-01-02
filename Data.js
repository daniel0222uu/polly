'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.activePlayerList = [];
  this.inviteList = [];
  this.activeLobbies = [];
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

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
 // console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
Data.prototype.activePlayers = function(name,number){
    this.activePlayerList.push({name:name,score:number});
}

// Testar funktion för att ta bort player från activePlayerList
Data.prototype.removePlayer = function(name){
  this.activePlayerList = this.activePlayerList.filter(player => player.name !== name);
}

Data.prototype.getActivePlayers = function(){
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
     // console.log("found lobby", lobby);
      return lobby.playersInLobby;
    }
  }
}
Data.prototype.startGame = function(players) {
  let totalTrueValuesNeeded = players.length;
 /* for (let player of players) {
    console.log("player getting looped :", player);
  }  tanke om att  skapa objekt för varje spelar namn då
  gamet startar men denna ide kanske inte behövs*/
  return totalTrueValuesNeeded;
}



module.exports = Data;



