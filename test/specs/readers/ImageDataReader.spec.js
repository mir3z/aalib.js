import Rx from "rxjs";
import { expect } from "chai";

import ImageDataReader from "../../../src/readers/ImageDataReader";

describe("readers/ImageDataReader", () => {
    const idata = { data: new Uint8Array([1, 2, 3, 4]), width: 1, height: 1 };

    it("creates Rx.Observable directly from image date", () => {
        expect(ImageDataReader.fromImageData(idata)).to.be.instanceOf(Rx.Observable);
    });

    it("reads image directly from image data", done => {
        ImageDataReader.fromImageData(idata)
            .do(image => expectTestImage(image))
            .subscribe(() => done());
    });

    function expectTestImage(image) {
        expect(image.data[0]).to.eql({ r: 1, g: 2, b: 3 });
    }
});