import { expect } from "chai";
import { withTestImage } from "../../utils";

import contrast from "../../../src/filters/contrast";

describe("filters/contrast", () => {
    it("decreases contrast if value from [0, 1) is given", withTestImage(img => {
        const filter = contrast(0.2);

        const output = filter(img);

        expect(output.data).to.eql([
            { r: 51, g: 0,  b: 0 },
            { r: 0,  g: 51, b: 0 },
            { r: 0,  g: 0,  b: 51 }
        ]);
    }));

    it("increases contrast if value > 1 is given", withTestImage(img => {
        const filter = contrast(100);

        const output = filter(img);

        expect(output.data).to.eql([
            { r: 255, g: 0,   b: 0 },
            { r: 0,   g: 255, b: 0 },
            { r: 0,   g: 0,   b: 255 }
        ]);
    }));

    it("does not change contrast if no value is given", withTestImage(img => {
        const filter = contrast();

        const output = filter(img);

        expect(output.data).to.eql([
            { r: 255, g: 0,   b: 0 },
            { r: 0,   g: 255, b: 0 },
            { r: 0,   g: 0,   b: 255 }
        ]);
    }));
});