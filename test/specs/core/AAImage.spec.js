import { expect } from "chai";

import AAImage from "../../../src/core/AAImage";
import rgbBase64Image from "../../resources/rgb.base64";

describe("core/AAImage", () => {

    it("retrieves value at given position", () => {
        const data = [
            "0.0", "1.0",
            "0.1", "1.1",
            "0.2", "1.2"
        ];
        const image = new AAImage({ width: 2, height: 3, data });

        expect(image.getAt(0, 0)).to.eql("0.0");
        expect(image.getAt(1, 1)).to.eql("1.1");
        expect(image.getAt(0, 2)).to.eql("0.2");
        expect(image.getAt(2, 2)).to.eql(undefined);
    });

    it("processes image data in place", () => {
        const data = [{ val: 5 }, { val: 10 }, { val: 15 }];
        const colorProcessor = {};
        const image = new AAImage({ width: 1, height: 3, data, colorProcessor });

        image.process((it, processor) => {
            it.val += 100;
            expect(processor).to.equal(colorProcessor);
        });

        expect(image.data).to.eql([{ val: 105 }, { val: 110 }, { val: 115 }]);
    });

    it("converts itself to ImageData", () => {
        const data = [
            { r: 10, g: 20, b: 30 },
            { r: 40, g: 50, b: 60 },
            { r: 70, g: 80, b: 90 }
        ];
        const image = new AAImage({ width: 1, height: 3, data });
        const idata = image.toImageData();

        expect(idata instanceof ImageData).to.be.ok;
        expect(idata.width).to.eql(1);
        expect(idata.height).to.eql(3);
        expect(Array.from(idata.data)).to.eql([
            10, 20, 30, 255,
            40, 50, 60, 255,
            70, 80, 90, 255
        ]);
    });

    it("creates itself from ImageData", () => {
        const idata = new ImageData(
            new Uint8ClampedArray([
                10, 20, 30, 0,
                40, 50, 60, 10
            ]),
            1, 2
        );

        const image = AAImage.fromImageData(idata);

        expect(image.width).to.eql(1);
        expect(image.height).to.eql(2);
        expect(image.data.length).to.eql(2);
        expect(image.data).to.eql([
            { r: 10, g: 20, b: 30 },
            { r: 40, g: 50, b: 60 }
        ]);
    });

    it("creates itself from HTMLImage", (done) => {
        const img = document.createElement("img");
        img.onload = expectImage;
        img.src = rgbBase64Image;

        function expectImage() {
            const image = AAImage.fromHTMLImageElement(img);

            expect(image.width).to.eql(3);
            expect(image.height).to.eql(1);
            expect(image.data.length).to.eql(3);
            expect(image.data).to.eql([
                { r: 255, g: 0,   b: 0 },
                { r: 0,   g: 255, b: 0 },
                { r: 0,   g: 0,   b: 255 }
            ]);

            done();
        }
    });
});