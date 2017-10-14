import { expect } from "chai";

import aafont from "../../src/aafont";

describe("aafont", () => {
    it("calculates and normalizes character brightness", () => {
        const charset = [".", "*", "#"];

        expect(aafont(charset)).to.eql([
            ["#", 0],
            ["*", 171],
            [".", 255]
        ]);
    });
});