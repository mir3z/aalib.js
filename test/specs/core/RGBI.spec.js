import { expect } from "chai";

import RGBI from "../../../src/core/RGBI";

describe("core/RGBI", () => {

    it("sets default values", () => {
        const rgbi = new RGBI();

        expectRGBI(rgbi, 0, 0, 0, 0);
    });

    it("sets provided values", () => {
        const rgbi = new RGBI(10, 20, 40, 50);

        expectRGBI(rgbi, 10, 20, 40, 50);
    });

    it("multiplies by value", () => {
        const rgbi = new RGBI(10, 20, 40, 50);

        rgbi.mul(2);

        expectRGBI(rgbi, 10, 20, 40, 100);
    });

    it("adds value", () => {
        const rgbi = new RGBI(100, 200, 0, 100);

        rgbi.add(100);

        expectRGBI(rgbi, 100, 200, 0, 200);
    });

    it("divides by value", () => {
        const rgbi = new RGBI(100, 200, 0, 200);

        rgbi.div(10);

        expectRGBI(rgbi, 100, 200, 0, 20);
    });

    it("inverts intensity", () => {
        const rgbi = new RGBI(0, 200, 255, 100);

        rgbi.inverse();

        expectRGBI(rgbi, 0, 200, 255, 155);
    });

    it("clamps intensity", () => {
        const rgbi = new RGBI(-100, 255, 100, 500);

        rgbi.clamp();

        expectRGBI(rgbi, -100, 255, 100, 255);
    });

    function expectRGBI(subject, r, g, b, i) {
        expect(subject.r).to.eql(r);
        expect(subject.g).to.eql(g);
        expect(subject.b).to.eql(b);
        expect(subject.intensity).to.eql(i);
    }
});
