import AbstractReader from "./AbstractReader";
import AAImage from "../core/AAImage";

export default class ImageDataReader extends AbstractReader {

    constructor(idata) {
        super();
        this.idata = idata;
    }

    onRead(observer) {
        observer.next(AAImage.fromImageData(this.idata));
        observer.complete();
    }

    static fromImageData(idata) {
        const reader = new ImageDataReader(idata);
        return reader.read();
    }

    static fromCanvas(canvas, x, y, width, height) {
        const ctx = canvas.getContext("2d");
        const idata = ctx.getImageData(
            x || 0,
            y || 0,
            width || canvas.width,
            height || canvas.height
        );

        return ImageDataReader.fromImageData(idata);
    }
}
