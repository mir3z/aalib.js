var Reader = require('./Reader');
var Image = require('../core/Image');

class ImageReader extends Reader {

    constructor() {
        super();
        this.src = '';
        this.img = null;
    }

    setSrc(src) {
        this.src = src;
    }

    createImageElement() {
        this.setImage(document.createElement('img'));
    }

    setImage(img) {
        this.img = img;
    }

    onRead(stream, error) {
        var onLoad = () => {
            this.img.removeEventListener('load', onLoad);
            this.img.removeEventListener('error', onError);
            stream(Image.fromHTMLImageElement(this.img));
        };

        var onError = () => {
            this.img.removeEventListener('load', onLoad);
            this.img.removeEventListener('error', onError);
            error('ImageReader: Error loading image');
        };

        this.img.addEventListener('load', onLoad);
        this.img.addEventListener('error', onError);

        if (this.img.complete && this.img.naturalWidth) {
            onLoad();
        } else if (this.src) {
            this.img.src = this.src;
        }
    }

    static fromURL(url) {
        var reader = new ImageReader();
        reader.setSrc(url);
        reader.createImageElement();
        return reader.read();
    }

    static fromImg(image) {
        var reader = new ImageReader();
        reader.setImage(image);
        return reader.read();
    }
}

module.exports = ImageReader;