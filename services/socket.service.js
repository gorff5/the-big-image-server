
var fs = require('fs');
var http = require('http');
var socket = require('socket.io')(http,  {origins:'localhost:* http://localhost:*'});
var imageService = require('./image.service');

socket.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(msg){
        console.log('message: ' + msg);
        socket.emit('chat message', base64_encode('./public/images/sample-image.jpg'));
        imageService.cropImage('./public/images/sample-image.jpg')
    });

});

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = socket;