import Reader from "./Reader";
import Image from "../core/Image";

export default class ImageDataReader extends Reader {

    constructor(idata) {
        super();
        this.idata = idata;
    }

    setImageData(idata) {
        this.idata = idata;
    }

    onRead(stream) {
        stream(Image.fromImageData(this.idata));
    }

    static fromImageData(idata) {
        const reader = new ImageDataReader(idata);
        return reader.read();
    }
}
