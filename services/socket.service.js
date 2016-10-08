var fs = require('fs');
var imageService = require('./image.service');

var socket={};

function connect(io) {
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('client_width', function(data){
    process.stdout.write(data.letter);
    console.log(data);
  });
  socket.on('client_highet', function(data){
    process.stdout.write(data.letter);
    console.log(data);
  });
        
        socket.on('share', function (msg) {
            console.log('message: ' + msg);
            io.emit('displayImage', base64_encode('./public/images/sample-image.jpg'));
            imageService.cropImage('./public/images/sample-image.jpg')
        });

    });
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports =function(io){
    connect(io);
    return socket;
};