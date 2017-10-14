import { expect } from "chai";

import ImageReader from "../../../src/readers/ImageReader";
import Stream from "../../../src/readers/Stream";
import rgbBase64Image from "../../resources/rgb.base64";

describe("readers/ImageReader", () => {

    it("allows to construct a stream directly from URL", () => {
        const stream = ImageReader.fromURL(rgbBase64Image);

        expect(stream).to.be.instanceOf(Stream);
    });

    it("allows to read image directly from URL", done => {
        ImageReader
            .fromURL(rgbBase64Image)
            .pipe(image => {
                expectTestImage(image);
                done();
            })
            .end();
    });

    it("allows to construct a stream directly from HTMLImageElement", () => {
        const stream = ImageReader.fromImg(createTestHTMLImage());

        expect(stream).to.be.instanceOf(Stream);
    });

    it("allows to read image directly from HTMLImageElement", done => {
        ImageReader
            .fromImg(createTestHTMLImage())
            .pipe(image => {
                expectTestImage(image);
                done();
            })
            .end();
    });

    function createTestHTMLImage() {
        const img = new Image();
        img.src = rgbBase64Image;
        return img;
    }

    function expectTestImage(image) {
        expect(image.data).to.eql([
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 0, g: 0, b: 255 }
        ]);
    }
});