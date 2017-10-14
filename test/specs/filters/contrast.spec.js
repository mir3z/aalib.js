import { expect } from "chai";
import { createTestImage } from "../../utils";

import contrast from "../../../src/filters/contrast";

describe("filters/contrast", () => {
    it("decreases contrast if value from [0, 1) is given", () => {
        const contrastFilter = contrast(0.2);

        const image = contrastFilter(createTestImage());

        expect(image.data).to.eql([
            { r: 51, g: 0,  b: 0 },
            { r: 0,  g: 51, b: 0 },
            { r: 0,  g: 0,  b: 51 }
        ]);
    });

    it("increases contrast if value > 1 is given", () => {
        const contrastFilter = contrast(100);

        const image = contrastFilter(createTestImage());

        expect(image.data).to.eql([
            { r: 255, g: 0,   b: 0 },
            { r: 0,   g: 255, b: 0 },
            { r: 0,   g: 0,   b: 255 }
        ]);
    });

    it("does not change contrast if no value is given", () => {
        const contrastFilter = contrast();

        const image = contrastFilter(createTestImage());

        expect(image.data).to.eql([
            { r: 255, g: 0,   b: 0 },
            { r: 0,   g: 255, b: 0 },
            { r: 0,   g: 0,   b: 255 }
        ]);
    });
});