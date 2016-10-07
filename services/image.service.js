var jimp = require("jimp");
//https://github.com/oliver-moran/jimp
var imageService = {};

imageService.cropImage = function cropImage(imageSrc) {

    // open a file called "lenna.png"
    jimp.read(imageSrc, function (err, image) {
        if (err) throw err;
        image.crop(0, 0, 1000,500)
             .write("lena-small-bw.jpg"); // save
    });
};

module.exports = imageService;