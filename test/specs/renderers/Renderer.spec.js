import { expect } from "chai";

import Renderer from "../../../src/renderers/Renderer";
import Image from "../../../src/core/Image";
import RGBI from "../../../src/core/RGBI";


describe("renderers/renderer", () => {

    it("matches character to given brightness level", () => {
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
        return new Renderer({
            charset: Renderer.CHARSET.SIMPLE
        });
    }

    function createTestImage() {
        const image = new Image(2, 1);

        image.data[0] = new RGBI(0, 0, 0, 255);
        image.data[1] = new RGBI(255, 255, 255, 0);

        return image;
    }
});