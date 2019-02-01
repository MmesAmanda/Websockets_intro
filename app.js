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

    socket.on('red', function(){
        console.log('red event detected')

        //socket = one client
        //io.socket = all clients
        socketIO.emit("color_change", {r:255,g:0, b:0});
    });

    socket.on('Green', function(){
        console.log('Green event detected')

        //socket = one client
        //io.socket = all clients
        socketIO.emit("color_change", {r:0,g:255, b:0});
    });

    socket.on('blue', function(){
        console.log('blue event detected')

        //socket = one client
        //io.socket = all clients
        socketIO.emit("color_change", {r:0,g:0, b:255});
    });
});


//stat server
server.listen(LISTEN_PORT);
console.log('listening on port:' + LISTEN_PORT); 