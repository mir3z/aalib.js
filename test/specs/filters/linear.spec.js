import { expect } from "chai";
import { withTestImage } from "../../utils";

import linear from "../../../src/filters/linear";

describe("filters/linear", () => {
    it("applies linear transformation", withTestImage(img => {
        const filter = linear(0.2, -10);

        const output = filter(img);

        expect(output.data).to.eql([
            { r: 41, g: 0,  b: 0 },
            { r: 0,  g: 41, b: 0 },
            { r: 0,  g: 0,  b: 41 }
        ]);
    }));
});
