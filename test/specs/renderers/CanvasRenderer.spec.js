import { expect } from "chai";

import canvasRenderer from "../../../src/renderers/CanvasRenderer";
import AAImage from "../../../src/core/AAImage";

describe("renderers/CanvasRenderer", () => {

    it("renders Canvas element", () => {
        const render = createRenderer();

        const el = render(createTestImage());

        expect(el.nodeType).to.eql(Node.ELEMENT_NODE);
        expect(el.nodeName.toLowerCase()).to.eql("canvas");
    });

    it("sets canvas size if given", () => {
        const render = createRenderer({ width: 100, height: 110 });

        const el = render(createTestImage());

        expect(el.width).to.eql(100);
        expect(el.height).to.eql(110);
    });

    function createRenderer(options) {
        return canvasRenderer(options);
    }

    function createTestImage() {
        const data = [
            { r: 0, g: 0, b: 0, mono: 255 },
            { r: 255, g: 255, b: 255, mono: 0 }
        ];
        return new AAImage({ width: 2, height: 1, data });
    }
});