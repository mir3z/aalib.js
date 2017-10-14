import { expect } from "chai";
import { createTestImage } from "../../utils";

import inverse from "../../../src/filters/inverse";

describe("filters/inverse", () => {
    it("inverts image", () => {
        const inverseFilter = inverse();

        const inverted = inverseFilter(createTestImage());

        expect(inverted.data).to.eql([
            { r: 0,   g: 255, b: 255 },
            { r: 255, g: 0,   b: 255 },
            { r: 255, g: 255, b: 0 }
        ]);
    });
});