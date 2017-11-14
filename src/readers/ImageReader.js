import AbstractReader from "./AbstractReader";
import AAImage from "../core/AAImage";

export default class ImageReader extends AbstractReader {

    constructor(url) {
        super();
        this.url = url;
    }

    onRead(observer) {
        const img = document.createElement("img");
        img.crossOrigin = "Anonymous";

        const onLoad = () => {
            removeListeners();
            observer.next(AAImage.fromHTMLImageElement(img));
            observer.complete();
        };

        const onError = (e) => {
            removeListeners();
            observer.error(e);
        };

        const removeListeners = () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
        };

        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);

        if (img.complete && img.naturalWidth) {
            onLoad();
        } else if (this.url) {
            img.src = this.url;
        }
    }

    static fromURL(url) {
        const reader = new ImageReader(url);
        return reader.read();
    }

    static fromHTMLImage(img) {
        return ImageReader.fromURL(img.src);
    }
}
