import Rx from "rxjs";
import { expect } from "chai";

import ImageReader from "../../../src/readers/ImageReader";
import rgbBase64Image from "../../resources/rgb.base64";
import { createTestHTMLImage } from "../../utils";

describe("readers/ImageReader", () => {

    it("creates Rx.Observable directly from URL", () => {
        expect(ImageReader.fromURL(rgbBase64Image)).to.be.instanceOf(Rx.Observable);
    });

    it("reads image directly from URL", done => {
        ImageReader
            .fromURL(rgbBase64Image)
            .do(image => expectTestImage(image))
            .subscribe(() => done());
    });

    it("creates Rx.Observable directly from HTMLImageElement", () => {
        return createTestHTMLImage().then(img => {
            expect(ImageReader.fromHTMLImage(img)).to.be.instanceOf(Rx.Observable);
        });
    });

    it("reads image directly from HTMLImageElement", done => {
        createTestHTMLImage().then(img => {
            ImageReader
                .fromHTMLImage(img)
                .do(image => expectTestImage(image))
                .subscribe(() => done());
        });
    });

    function expectTestImage(image) {
        expect(image.data).to.eql([
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 0, g: 0, b: 255 }
        ]);
    }
});