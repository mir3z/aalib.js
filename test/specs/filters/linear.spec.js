import { expect } from "chai";
import { createTestImage } from "../../utils";

import linear from "../../../src/filters/linear";

describe("filters/linear", () => {
    it("applies linear transformation", () => {
        const linearFilter = linear(0.2, -10);

        const image = linearFilter(createTestImage());

        expect(image.data).to.eql([
            { r: 41, g: 0,  b: 0 },
            { r: 0,  g: 41, b: 0 },
            { r: 0,  g: 0,  b: 41 }
        ]);
    });
});
