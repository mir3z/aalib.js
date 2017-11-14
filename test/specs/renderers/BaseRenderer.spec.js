import { expect } from "chai";

import BaseRenderer, { SIMPLE_CHARSET } from "../../../src/renderers/BaseRenderer";
import AAImage from "../../../src/core/AAImage";


describe("renderers/BaseRenderer", () => {

    it("matches character with given brightness level", () => {
        const renderer = createRenderer();

        expect(renderer.matchChar(255)).to.eql(".");
        expect(renderer.matchChar(0)).to.eql("M");
    });

    it("renders image using given charset", () => {
        const renderer = createRenderer();

        const image = renderer.render(createTestImage());

        expect(image.data.map(d => d.char)).to.eql([".", "M"]);
    });

    function createRenderer() {
        return new BaseRenderer({
            charset: SIMPLE_CHARSET
        });
    }

    function createTestImage() {
        const data = [
            { r: 0, g: 0, b: 0, mono: 255 },
            { r: 255, g: 255, b: 255, mono: 0 }
        ];
        return new AAImage({ width: 2, height: 1, data });
    }
});