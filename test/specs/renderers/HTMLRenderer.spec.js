import { expect } from "chai";

import htmlRenderer from "../../../src/renderers/HTMLRenderer";

import Image from "../../../src/core/Image";
import RGBI from "../../../src/core/RGBI";

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
        image.colorful = true;
        const el = render(image);

        expectHTMLElement(el, { tagName: "pre" });
        expect(el.children).to.have.lengthOf(2);
        expect(el.children[0].style.color.toLowerCase()).to.eql("rgb(0, 0, 0)");
        expect(el.children[1].style.color.toLowerCase()).to.eql("rgb(255, 255, 255)");
    });

    function expectHTMLElement(el, checks) {
        checks = checks || {};

        expect(el.nodeType).to.eql(1);

        checks.tagName && expect(el.nodeName.toLowerCase()).to.eql(checks.tagName);
        checks.htmlContent && expect(el.innerHTML).to.eql(checks.htmlContent);
    }

    function createRenderer(options) {
        options = options || {};
        options.charset = htmlRenderer.CHARSET.SIMPLE;
        return htmlRenderer(options);
    }

    function createTestImage() {
        const image = new Image(2, 1);

        image.data[0] = new RGBI(0, 0, 0, 255);
        image.data[1] = new RGBI(255, 255, 255, 0);

        return image;
    }
});