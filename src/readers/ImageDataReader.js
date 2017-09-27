var Reader = require('./Reader');
var Image = require('../core/Image');

class ImageDataReader extends Reader {

    constructor(idata) {
        super();
        this.idata = null;
    }

    setImageData(idata) {
        this.idata = idata;
    }

    onRead(stream, error) {
        stream(Image.fromImageData(this.idata));
    }

    static fromImageData(idata) {
        var reader = new ImageDataReader();
        reader.setImageData(idata);
        return reader.read();
    }
}

module.exports = ImageDataReader;