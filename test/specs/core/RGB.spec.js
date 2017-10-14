import { expect } from "chai";

import RGB from "../../../src/core/RGB";

describe("core/RGB", () => {

    it("sets default values", () => {
        const rgb = new RGB();

        expectRGB(rgb, 0, 0, 0);
    });

    it("sets provided values", () => {
        const rgb = new RGB(10, 20, 40);

        expectRGB(rgb, 10, 20, 40);
    });

    it("multiplies by value", () => {
        const rgb = new RGB(10, 20, 40);

        rgb.mul(10);

        expectRGB(rgb, 100, 200, 400);
    });

    it("adds value", () => {
        const rgb = new RGB(100, 200, 0);

        rgb.add(100);

        expectRGB(rgb, 200, 300, 100);
    });

    it("adds color", () => {
        const rgb = new RGB(100, 200, 0);

        rgb.addc(new RGB(100, 50, 10));

        expectRGB(rgb, 200, 250, 10);
    });

    it("divides by value", () => {
        const rgb = new RGB(100, 200, 0);

        rgb.div(10);

        expectRGB(rgb, 10, 20, 0);
    });

    it("inverts color", () => {
        const rgb = new RGB(0, 200, 255);

        rgb.inverse();

        expectRGB(rgb, 255, 55, 0);
    });

    it("calculates grayscale value", () => {
        const rgb = new RGB(0, 200, 100);

        const gray = rgb.getGrayscale();

        expect(gray).to.eql(100);
    });

    it("clamps color components", () => {
        const rgb = new RGB(-100, 255, 500);

        rgb.clamp();

        expectRGB(rgb, 0, 255, 255);
    });

    function expectRGB(subject, r, g, b) {
        expect(subject.r).to.eql(r);
        expect(subject.g).to.eql(g);
        expect(subject.b).to.eql(b);
    }
});
