import { expect } from "chai";

import aafont from "../../src/aafont";

describe("aafont", () => {
    it("calculates and normalizes character brightness", () => {
        const charset = [".", "*", "#"];

        expect(aafont(charset)).to.eql([
            { char: "#", brightness: 0 },
            { char: "*", brightness: 173 },
            { char: ".", brightness: 255 }
        ]);
    });
});