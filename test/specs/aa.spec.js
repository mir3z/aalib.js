import { expect } from "chai";

import aa from "../../src/aa";
import { createTestImage } from "../utils";

describe("aa", () => {
    it("converts RGB Image to RGBI Image", () => {
        const testImage = createTestImage();
        const { width, height } = testImage;

        const out = aa({ width, height })(testImage);

        expect(out).to.eql({
            width,
            height,
            data: [
                { r: 255, g: 0,   b: 0,   intensity: 0 },
                { r: 0,   g: 255, b: 0,   intensity: 0 },
                { r: 0,   g: 0,   b: 255, intensity: 0 }
            ],
            colorful: undefined
        });
    });
});