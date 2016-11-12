var jimp = require("jimp");
q = require('q');
//https://github.com/oliver-moran/jimp
//https://github.com/jsmarkus/node-bin-packing
var imageService = {};

imageService.cropImage = function cropImage(imageSrc, pieces) {
    var deferred = q.defer();

    var resizeImageSize = pieces.packer.root;
    var blocks = pieces.blocks;

    jimp.read(imageSrc, function (err, image) {
        if (err) throw err;

        var croppedImages = [];

        image.resize(parseInt(resizeImageSize.w), parseInt(resizeImageSize.h)).write("newImage.jpg", cropToPieces(blocks));

        function cropToPieces(blocks) {

            jimp.read("newImage.jpg", function (err, image) {
                if (err) {
                    if(err.message == 'Unsupported MIME type: '){
                        setTimeout(function(){
                            cropToPieces(blocks);
                        },200);
                        return;
                    }
                    else{
                        throw err;
                    }
                }
                if (blocks.length == 0) return deferred.resolve(croppedImages);

                var block = blocks.pop();


                while(!block.fit){
                    setTimeout(function(){cropToPieces(blocks);},1000);
                    return;
                }
                var x = block.fit.x;
                var y = block.fit.y;
                var w = block.w;
                var h = block.h;



                croppedImages.unshift("image" + x + "-" + y + "-" + w + "-" + h + ".jpg");

                image.crop(x, y, w, h)
                    .write("image" + x + "-" + y + "-" + w + "-" + h + ".jpg", cropToPieces(blocks)); // save

            })
        }
    });
    return deferred.promise;
};



module.exports = imageService;