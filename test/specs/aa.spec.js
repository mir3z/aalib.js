import { expect } from "chai";

import aa from "../../src/aa";
import { withTestImage } from "../utils";

describe("aa function", () => {
    it("converts RGB Image to RGBI Image", withTestImage(img => {
        const { width, height } = img;
        const out = aa({ width, height })(img);

        expect(out.data).to.eql([
            { r: 255, g: 0,   b: 0,   mono: 0 },
            { r: 0,   g: 255, b: 0,   mono: 0 },
            { r: 0,   g: 0,   b: 255, mono: 0 }
        ]);

        expect(out.width).to.eql(width);
        expect(out.height).to.eql(height);
        expect(out.meta).to.eql({ colored: false });
    }));
});