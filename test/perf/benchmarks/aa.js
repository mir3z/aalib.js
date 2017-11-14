import AAImage from "../../../src/core/AAImage";
import { aa } from "../../../src/aa";

export default function benchmark({ test, run }) {
    loadTestImage("resources/marylin.jpg", aaInputImage => {
        [
            { width: 200, height: 160 },
            { width: 400, height: 320 },
            { width: 600, height: 460 },
        ].forEach(({ width, height }) => {
            test(`aa ${ width }x${ height }`, () => aa(aaInputImage, { width, height }));
        });

        run();
    });
}

function loadTestImage(url, callback) {
    const img = document.createElement("img");
    img.addEventListener("load", () => callback(AAImage.fromHTMLImageElement(img)));
    img.src = url;
}

