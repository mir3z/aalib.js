import Image from "../src/core/Image";
import rgbBase64Image from "./resources/rgb.base64";

export function createTestImage() {
    return Image.fromHTMLImageElement(createTestHTMLImage());
}

export function createTestHTMLImage() {
    const img = document.createElement("img");
    img.src = rgbBase64Image;
    return img;
}
