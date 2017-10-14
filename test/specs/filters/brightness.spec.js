import { expect } from "chai";
import { createTestImage } from "../../utils";

import brightness from "../../../src/filters/brightness";

describe("filters/brightness", () => {
    it("decreases brightness when negative value is given", () => {
        const brightnessFilter = brightness(-10);

        const image = brightnessFilter(createTestImage());

        expect(image.data).to.eql([
            { r: 245, g: 0,   b: 0 },
            { r: 0,   g: 245, b: 0 },
            { r: 0,   g: 0,   b: 245 }
        ]);
    });

    it("increases brightness when positive value is given", () => {
        const brightnessFilter = brightness(10);

        const image = brightnessFilter(createTestImage());

        expect(image.data).to.eql([
            { r: 255, g: 10,  b: 10 },
            { r: 10,  g: 255, b: 10 },
            { r: 10,  g: 10,  b: 255 }
        ]);
    });

    it("does not change brightness when no value is given", () => {
        const brightnessFilter = brightness();

        const image = brightnessFilter(createTestImage());

        expect(image.data).to.eql([
            { r: 255, g: 0,   b: 0 },
            { r: 0,   g: 255, b: 0 },
            { r: 0,   g: 0,   b: 255 }
        ]);
    });
});