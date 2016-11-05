var fs = require('fs');
var imageService = require('./image.service');
var packingService = require('./packing.service');


var socket={};

function connect(io) {
    var clients = [];

    io.on('connection', function (socket) {
        clients.push({id: socket.id, screenSize: getScreenSize(socket)});
        console.log('a user connected');

        socket.on('disconnect', function (socket) {
            clients.splice(socket.id, 1);
            console.log('user disconnected');
        });

        socket.on('share', function (msg) {
            console.log('message: ' + msg);
            var pieces = io.engine.clientsCount;

            packingService.packing();

            imageService.cropImage('./public/images/sample-image.jpg', pieces).then(function (data) {
                for (var i=0; i < pieces; i++) {
                    io.sockets.connected[clients[i]].emit('displayImage', base64_encode(data[i]));
                }
            });
        });

    });
}


module.exports =function(io){
    connect(io);
    return socket;
};


////////////////////////////////////////////////helper function

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


function getScreenSize(socket) {
    return JSON.parse(socket.request._query['screenSize']);
}