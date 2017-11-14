import { expect } from "chai";

import htmlRenderer, { SIMPLE_CHARSET } from "../../../src/renderers/HTMLRenderer";
import AAImage from "../../../src/core/AAImage";

describe("renderers/HTMLRenderer", () => {

    it("renders as HTML element", () => {
        const render = createRenderer();

        const el = render(createTestImage());

        expectHTMLElement(el, { tagName: "pre", htmlContent: ".M" });
    });

    it("renders as HTML element of given type", () => {
        const render = createRenderer({
            tagName: "div"
        });

        const el = render(createTestImage());

        expectHTMLElement(el, { tagName: "div", htmlContent: ".M" });
    });

    it("preserves colors if enabled", () => {
        const render = createRenderer();

        const image = createTestImage();
        image.meta.colored = true;
        const el = render(image);

        expectHTMLElement(el, { tagName: "pre" });
        expect(el.children).to.have.lengthOf(2);
        expect(el.children[0].style.color.toLowerCase()).to.eql("rgb(0, 0, 0)");
        expect(el.children[1].style.color.toLowerCase()).to.eql("rgb(255, 255, 255)");
    });

    function expectHTMLElement(el, checks) {
        checks = checks || {};

        expect(el.nodeType).to.eql(Node.ELEMENT_NODE);

        checks.tagName && expect(el.nodeName.toLowerCase()).to.eql(checks.tagName);
        checks.htmlContent && expect(el.innerHTML).to.eql(checks.htmlContent);
    }

    function createRenderer(options) {
        options = options || {};
        options.charset = SIMPLE_CHARSET;
        return htmlRenderer(options);
    }

    function createTestImage() {
        const data = [
            { r: 0, g: 0, b: 0, mono: 255 },
            { r: 255, g: 255, b: 255, mono: 0 }
        ];
        return new AAImage({ width: 2, height: 1, data });
    }
});