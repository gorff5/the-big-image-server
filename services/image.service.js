var jimp = require("jimp");
q = require('q');
//https://github.com/oliver-moran/jimp
//https://github.com/jsmarkus/node-bin-packing
var imageService = {};

imageService.cropImage = function cropImage(imageSrc, pieces) {
    var deferred = q.defer();

    jimp.read(imageSrc, function (err, image) {
        if (err) throw err;

        var croppedImages = [];
        var width = image.bitmap.width;
        var height = image.bitmap.height;
        var slicedRange = width / pieces;

        var x = 0;
        var y = 0;
        var w = slicedRange;
        var h = parseInt(height);

         crop(0, x);


        function crop(i, x) {
            if (i >= pieces) return deferred.resolve(croppedImages) ;

            jimp.read(imageSrc, function (err, image) {
                if (err) throw err;

                image.crop(x, y, w, h)
                    .write("image" + x + "-" + y + "-" + w + "-" + h + ".jpg", onFinish); // save

                croppedImages.push("image" + x + "-" + y + "-" + w + "-" + h + ".jpg");
            });

            function onFinish() {
                 crop(i + 1, x + slicedRange);
            }
        }
    });
    return deferred.promise;
};



module.exports = imageService;