var fs = require('fs');
var imageService = require('./image.service');
var packingService = require('./packing.service');


var socket={};

function connect(io) {
    var clients = [];

    io.on('connection', function (socket) {
        clients.push({id: socket.id,w:getWidth(socket),h:getHeight(socket)});

        console.log('a user connected-'+getWidth(socket)+'-'+getHeight(socket));

        socket.on('disconnect', function (socket) {
            clients.splice(socket.id, 1);
            console.log('user disconnected');
        });

        socket.on('share', function (msg) {
            console.log('message: ' + msg);
            var calcImageWithPieces = packingService.packing(JSON.parse(JSON.stringify(clients)));

            imageService.cropImage('./public/images/sample-image.jpg', calcImageWithPieces).then(function (data) {
                setTimeout(function(){
                    for (var i=0; i < data.length; i++) {
                        io.sockets.connected[clients[i].id].emit('displayImage', base64_encode(data[i]));
                    }
                },5000)

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


function  getWidth(socket){
    return getScreenSize(socket).w;
}

function getHeight(socket){
    return getScreenSize(socket).h;
}

function getScreenSize(socket) {
    return JSON.parse(socket.request._query['screenSize']);
}