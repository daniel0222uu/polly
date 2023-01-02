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

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  socket.on('startPlaying', function(d) {
    data.activePlayers(d.name, d.score);
    io.emit('multiplayerViewUpdate', data.getActivePlayers());
  });

  // Testar att skapa en funktion för ta bort spelare i ActivePlayers
  socket.on('exitPlaying', function(d) {
    data.removePlayer(d);
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
    data.appendInviteList(objectToSend);
    //socket.emit('requestReceive', data.getInviteList());
    io.emit('requestReceive', data.getInviteList());
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

  socket.on("startGame", function(d) {
    console.log("start game received, for the lobbyID: ", d.pollId, d.players);
    console.log("now just running startGame data function", data.startGame(d.players)); //denna returnera
    //inget för startgame har ingen return :D
    io.to(d.pollId).emit('totalTrueValues', data.startGame(d.players));
  });

  socket.on('seeQuestion', function(d) {
    console.log("see question received,: ", d.pollId);
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
}


module.exports = sockets;