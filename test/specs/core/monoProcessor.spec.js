import { expect } from "chai";

import processor from "../../../src/core/monoProcessor";

describe("core/monoProcessor", () => {
    it("multiplies mono color by value", () => {
        const c = color({ mono: 40 });

        processor.mul(c, 3);

        expect(c).to.eql(color({ mono: 120 }));
    });

    it("adds a value to mono color", () => {
        const c = color({ mono: 25 });

        processor.add(c, 20);

        expect(c).to.eql( color({ mono: 45 }));
    });

    it("divides mono color by a value", () => {
        const c = color({ mono: 60 });

        processor.div(c, 2);

        expect(c).to.eql(color({ mono: 30 }));
    });

    it("inverts mono color", () => {
        const c = color({ mono: 5 });

        processor.inverse(c);

        expect(c).to.eql({ r: 10, g: 20, b: 30, mono: 250 });
    });

    const color = ({ r = 10, g = 20, b = 30, mono = 40 }) => ({ r, g, b, mono });
});