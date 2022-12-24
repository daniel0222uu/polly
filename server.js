// Inspired by https://gist.github.com/icebob/0dda386fceb8e14b91d84d057fac676f
"use strict";

// Create express app
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var http = require('http').Server(app);
var path = require('path');
const fs = require("fs");
app.use(bodyParser.json());


app.post('/fileTest', (req, res) => { //axios test reveiver
    const data = req.body;
    //logs only the data part of the axios post, no headers or other info
    console.log("realAxios is responding on the server");

    // Do something with the data here, such as saving it to a database
    const file = fs.readFileSync("/Users/danielceoca/Desktop/projektGränssnitt/polly/src/assetts/Decks.json");
    let jsonOfTheFile = JSON.parse(file);
    jsonOfTheFile.push(data.data);
    console.log(jsonOfTheFile);
    fs.writeFileSync("/Users/danielceoca/Desktop/projektGränssnitt/polly/src/assetts/Decks.json", JSON.stringify(jsonOfTheFile));



    //console.log(JSON.parse(file));
    //console.log(data.data);


    res.send({ message: 'Data received' });
});

// Generate webpack config with CLI service
if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require("@vue/cli-service/webpack.config.js");

  // Configure webpack as middleware
  const webpack = require("webpack");

  webpackConfig.entry.app.unshift('webpack-hot-middleware/client');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  //console.log(webpackConfig);
  const compiler = webpack(webpackConfig);
  const devMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
  app.use(devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { "Access-Control-Allow-Origin": "*" },
      stats: {colors: true}
  }));

  const hotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
  app.use(hotMiddleware(compiler, {
      log: console.log
  }));
}
else {
  app.use(express.static(path.join(__dirname, 'dist/')));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


const io = require('socket.io')(http, {cookie: false});

// Read in the "class" to store all our data on the server side
// If you need to change how data is handled, check the Data.js file!

const Data = require("./Data.js");
const sockets = require("./sockets.js");

let data = new Data();

io.on('connection', function (socket) {
  sockets(this, socket, data);
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, function() {
    console.log("Developer server running on http://localhost:" + PORT);
});
