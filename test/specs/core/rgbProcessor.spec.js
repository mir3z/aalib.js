import { expect } from "chai";

import processor from "../../../src/core/rgbProcessor";

describe("core/rgbProcessor", () => {
    it("multiplies rgb color by value", () => {
        const c = color(10, 20, 30);

        processor.mul(c, 10);

        expect(c).to.eql(color(100, 200, 300));
    });

    it("adds value to rgb color", () => {
        const c = color(100, 200, 0);

        processor.add(c, 100);

        expect(c).to.eql(color(200, 300, 100));
    });

    it("adds a rgb color to rgb color", () => {
        const c = color(100, 200, 0);

        processor.addc(c, color(100, 50, 10));

        expect(c).to.eql(color(200, 250, 10));
    });

    it("divides rgb color by value", () => {
        const c = color(100, 200, 0);

        processor.div(c, 10);

        expect(c).to.eql(color(10, 20, 0));
    });

    it("inverts rgb color", () => {
        const c = color(0, 200, 255);

        processor.inverse(c);

        expect(c).to.eql(color(255, 55, 0));
    });

    it("calculates grayscale value of a rgb color", () => {
        expect(processor.getGrayscale(color(0, 200, 100))).to.eql(100);
    });

    it("clamps rgb color", () => {
        const c = color(-100, 255, 500);

        processor.clamp(c);

        expect(c).to.eql(color(0, 255, 255));
    });

    const color = (r = 10, g = 20, b = 30) => ({ r, g, b });
});