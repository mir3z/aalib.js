var Image = require('core/Image');
var rgbBase64Image = require('resources/rgb.base64');

var utils = {
    createTestHTMLImage() {
        var img = document.createElement('img');
        img.src = rgbBase64Image;
        return img;
    },

    createTestImage() {
        return Image.fromHTMLImageElement(utils.createTestHTMLImage());
    }
};

module.exports = utils;
