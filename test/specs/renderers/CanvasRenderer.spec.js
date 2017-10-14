import { expect } from "chai";
import { spy } from "sinon";

import canvasRenderer from "../../../src/renderers/CanvasRenderer";
import Image from "../../../src/core/Image";
import RGBI from "../../../src/core/RGBI";

describe("renderers/CanvasRenderer", () => {

    it("renders Canvas element", () => {
        const render = createRenderer();

        const el = render(createTestImage());

        expect(el.nodeType).to.eql(1);
        expect(el.nodeName.toLowerCase()).to.eql("canvas");
    });

    it("sets canvas size if given", () => {
        const render = createRenderer({ width: 100, height: 110 });

        const el = render(createTestImage());

        expect(el.width).to.eql(100);
        expect(el.height).to.eql(110);
    });

    it("renders monochrome by default", () => {
        const render = createRenderer();
        const monochroneSpy = spy(canvasRenderer.Class.prototype, "renderMonochrome");

        render(createTestImage());

        expect(monochroneSpy.called).to.be.ok;
    });

    it("preserves colors if enabled", () => {
        const render = createRenderer();
        const colorfulSpy = spy(canvasRenderer.Class.prototype, "renderColorful");
        const image = createTestImage();
        image.colorful = true;

        render(image);

        expect(colorfulSpy.called).to.be.ok;
    });

    function createRenderer(options) {
        return canvasRenderer(options);
    }

    function createTestImage() {
        const image = new Image(2, 1);

        image.data[0] = new RGBI(0, 0, 0, 255);
        image.data[1] = new RGBI(255, 255, 255, 0);

        return image;
    }
});