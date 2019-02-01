const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io')(server); 

const LISTEN_PORT = 8080;

app.use(express.static(__dirname + "/public") );


//routes
app.get('/color', function(req, res){
    res.sendFile(__dirname + '/public/color.html');

});

app.get('/controller', function(req, res){
    res.sendFile(__dirname + '/public/controller.html');

});

//socket stuff

socketIO.on('connection', function(socket){
    console.log(socket.id + 'connected!')

    socket.on('diconnect', function(){
        console.log(socket.id + 'disconnected')
    });
});


//stat server
server.listen(LISTEN_PORT);
console.log('listening on port:' + LISTEN_PORT); 