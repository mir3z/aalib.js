var RGB = require('./core/RGB');
var RGBI = require('./core/RGBI');
var Image = require('./core/Image');
var utils = require('./utils');

var color = {};

function aa(image, options) {
    var { width, height, colorful } = options;

    var bw = image.width / width;
    var bh = image.height / height;

    var imin = 255;
    var imax = 0;

    var aaImage = new Image(width, height);

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {

            color = analyzeBlock(
                image,
                ~~(j * bw),
                ~~(i * bh),
                bw,
                bh
            );

            if (color.intensity > imax) {
                imax = color.intensity;
            }
            if (color.intensity < imin) {
                imin = color.intensity;
            }

            aaImage.data.push(color);
        }
    }

    normalizeIntensity(aaImage, imin, imax);

    aaImage.colorful = colorful;

    return aaImage;
}

function analyzeBlock(image, x, y, width, height) {
    var count = 0;
    var avgColor = new RGB();
    var color;

    for (var row = 0; row < height; row++) {
        for (var col = 0; col < width; col++) {
            color = image.getAt(x + col, y + row);
            avgColor.addc(color);
            count++;
        }
    }

    avgColor.div(count);

    return new RGBI(
        avgColor.r,
        avgColor.g,
        avgColor.b,
        avgColor.getGrayscale()
    );
}

function normalizeIntensity(img, a, b) {
    img.filter((color) => {
        color.intensity = ~~utils.mapRange(color.intensity, a, b, 0, 255);
    });
}

function factory(options) {
    return function (image) {
        return aa(image, options);
    };
}

module.exports = factory;