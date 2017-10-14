import { expect } from "chai";

import ImageDataReader from "../../../src/readers/ImageDataReader";

describe("readers/ImageDataReader", () => {

    it("should allow to construct a stream from image data", done => {
        const idata = { data: new Uint8Array([1, 2, 3, 4]), width: 1, height: 1 };

        ImageDataReader.fromImageData(idata)
            .pipe(image => {
                expectTestImage(image);
                done();
            })
            .end();
    });

    function expectTestImage(image) {
        expect(image.data[0]).to.eql({ r: 1, g: 2, b: 3 });
    }
});