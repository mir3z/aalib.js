import AAImage from "../src/core/AAImage";
import rgbBase64Image from "./resources/rgb.base64";
import videoBase64 from "./resources/video.base64";


export function withTestImage(fn) {
    return () => createTestImage().then(fn);
}

export function createTestImage() {
    return createTestHTMLImage()
        .then(AAImage.fromHTMLImageElement);
}

export function createTestHTMLImage() {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", (e) => reject(e));
        img.src = rgbBase64Image;
    });
}

export function createTestVideoElement() {
    const video = document.createElement("video");
    video.src = videoBase64;
    return video;
}
