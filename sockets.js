function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());


  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
   // console.log(d.pollId, "was sent to the socket.js in createPoll");
    socket.emit('pollCreated', d.pollId);

  });

  socket.on("updatePollView", function(d) {
    //console.log("update pollview received:", d.name);
  });


  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
  });

  socket.on('startPlaying', function(d) {
    data.activePlayers(d.name, d.activityStamp);
    io.emit('multiplayerViewUpdate', data.getActivePlayers());
  });

  // Testar att skapa en funktion för ta bort spelare i ActivePlayers
  socket.on('exitPlaying', function(d) {
    console.log("exitPlaying received:", d.name);
    data.removePlayer(d.name);
    io.emit('multiplayerViewUpdate', data.getActivePlayers());
  });


  socket.on('numberProgress', function(d) {
    data.updateScore(d.name, d.score);
    io.emit('multiplayerViewUpdate', data.getActivePlayers());
  });

  socket.on('playRequest', function(d) {
    const requester = d.requester;
    const receiver  = d.receiver;
    const lobbyID= d.lobbyID;
    const objectToSend = {requester: requester, receiver: receiver, lobbyID: lobbyID};
    console.log("playRequest received:", objectToSend);
    data.appendInviteList(objectToSend);
    //socket.emit('requestReceive', data.getInviteList());
    io.emit('requestReceive', objectToSend);
  });

  socket.on('lobbyObject', function(d) {
    const lobbyID = d.lobbyID;
    const playersInLobby = d.playersInLobby;
    const objectToSend = {lobbyID: lobbyID, playersInLobby: playersInLobby};
    data.appendLobbies(objectToSend);
  });

  socket.on('joinLobby', function(d) {
    const name = d.name;
    const lobbyID = d.lobbyID;
    data.updateLobbies(name, lobbyID);
    console.log(data.getLobbyParticipants(lobbyID));
  });

  socket.on('getPlayers', function(d) {
    console.log(data.getLobbyParticipants(d.pollId));
    //console.log("if this is correct, it should be seen in console from submit answer", d.questionObject, d.pollId);
    io.to(d.pollId).emit('dataUpdate', data.getLobbyParticipants(
        d.pollId));
  });

  socket.on('suggestGame', function(d) {
    io.to(d.pollId).emit('gameSuggested', d.deckName);
  });

  socket.on('acceptGame', function(d) {
    console.log("acceptGame received:", d.deckName);
    io.to(d.pollId).emit('gameAccepted', d.deckName);
  });

  socket.on("startGame", function(d) {
    console.log("start game received, for the lobbyID: ", d.pollId, d.players);
    console.log("now just running startGame data function", data.startGame(d.players));
    io.to(d.pollId).emit('totalTrueValues', data.startGame(d.players));
  });

  socket.on('seeQuestion', function(d) {
    io.to(d.pollId).emit('updateTrueCount');
  });

  socket.on('questionSeen', function(d) {
  console.log("question seen received,: ", d.pollId);
  io.to(d.pollId).emit('resetTrueCount');
  });

  socket.on('loadDeck', function(d) {
    console.log("load deck received,: ", d.pollId);
    io.to(d.pollId).emit('instantiateDeck', d.deck);
  });

  socket.on('sendMessage', function(d) {
    console.log("send message received,: ", d);
    io.to(d.pollId).emit('appendChatMessage',d);
  });

  socket.on('playerActive', function(d) {
    // console.log("playerActive received,: ", d);
   // console.log('the active players are logged in sockets: ', data.getActivePlayers());
    io.emit('multiplayerViewUpdate', data.updateActivity(d.name, d.activityStamp));
  });
}


module.exports = sockets;