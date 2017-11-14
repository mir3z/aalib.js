import { expect } from "chai";
import { withTestImage } from "../../utils";

import inverse from "../../../src/filters/inverse";

describe("filters/inverse", () => {
    it("inverts image", withTestImage(img => {
        const filter = inverse();

        const output = filter(img);

        expect(output.data).to.eql([
            { r: 0,   g: 255, b: 255 },
            { r: 255, g: 0,   b: 255 },
            { r: 255, g: 255, b: 0 }
        ]);
    }));
});