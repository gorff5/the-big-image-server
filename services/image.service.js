var jimp = require("jimp");
//https://github.com/oliver-moran/jimp
var imageService = {};
var imageS;

imageService.cropImage = function cropImage(imageSrc) {
    imageS = imageSrc;

    imageService.calcImageToPieces(imageSrc, 3);

};

imageService.calcImageToPieces = function calcImageToPieces(imageSrc, pieces) {

    jimp.read(imageSrc, function (err, image) {
        if (err) throw err;

        var width = image.bitmap.width;
        var height = image.bitmap.height;

        // __calcCropCoordinates(imageWidth, imageHeight, pieces);
        var slicedRange = width / pieces;

        var x = 0;
        var y = 0;
        var w = slicedRange;
        var h = parseInt(height);

        crop(0, x);

        function crop(i, x) {
            if (i >= pieces) return;

            jimp.read(imageSrc, function (err, image) {
                if (err) throw err;

                image.crop(x, y, w, h)
                    .write("image" + x + "-" + y + "-" + w + "-" + h + ".jpg", onFinish); // save
            });

            function onFinish() {
                    crop(i + 1, x + slicedRange);
            }
        }
    });
};


module.exports = imageService;