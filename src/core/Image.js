var each = require('lodash/collection/each');
var RGB = require('./RGB');

class Image {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = [];
    }

    getAt(x, y) {
        return this.data[x + this.width * y];
    }

    filter(fn) {
        each(this.data, fn);
        return this;
    }

    toImageData() {
        var data = [];
        var color;

        for (var i = 0; i < this.data.length; i++) {
            color = this.data[i];

            data[data.length] = color.r;
            data[data.length] = color.g;
            data[data.length] = color.b;
            data[data.length] = 255;
        }

        return new ImageData(
            new Uint8ClampedArray(data),
            this.width,
            this.height
        );
    }

    static fromImageData(idata) {
        var img = new Image(idata.width, idata.height);

        for (var i = 0, len = idata.data.length; i < len; i += 4) {
            img.data.push(new RGB(
                idata.data[i],
                idata.data[i + 1],
                idata.data[i + 2]
                // Ignore alpha: (i+3)-th element
            ));
        }

        return img;
    }

    static fromHTMLImageElement(image) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        ctx.canvas.width = image.naturalWidth;
        ctx.canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);

        return Image.fromImageData(
            ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight)
        );
    }
}

module.exports = Image;