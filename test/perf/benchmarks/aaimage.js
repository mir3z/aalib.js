import AAImage from "../../../src/core/AAImage";

export default function benchmark({ test, run }) {
    loadTestImage("resources/marylin.jpg", ({ img, idata }) => {
        test("AAImage.fromHTMLImageElement", () => AAImage.fromHTMLImageElement(img));
        test("AAImage.fromImageData", () => AAImage.fromImageData(idata));

        run();
    });
}

function loadTestImage(url, callback) {
    const img = document.createElement("img");

    img.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const { naturalWidth, naturalHeight } = img;

        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        ctx.drawImage(img, 0, 0);
        const idata = ctx.getImageData(0, 0, naturalWidth, naturalHeight);

        callback({ img, idata });
    });

    img.src = url;
}
