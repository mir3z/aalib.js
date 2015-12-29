var htmlRenderer = require('renderers/HTMLRenderer');
var Image = require('core/Image');
var RGBI = require('core/RGBI');

describe('HTMLRenderer', () => {

    it('should render as HTML element', () => {
        var render = createRenderer();

        var el = render(createTestImage());

        expectHTMLElement(el, { tagName: 'pre', htmlContent: '.M' });
    });

    it('should render as HTML element of given type', () => {
        var render = createRenderer({
            tagName: 'div'
        });

        var el = render(createTestImage());

        expectHTMLElement(el, { tagName: 'div', htmlContent: '.M' });
    });

    it('should preserve colors if enabled', () => {
        var render = createRenderer();

        var image = createTestImage();
        image.colorful = true;
        var el = render(image);

        expectHTMLElement(el, { tagName: 'pre' });
        expect(el.children.length).toBe(2);
        expect(el.children[0].style.color.toLowerCase()).toBe('rgb(0, 0, 0)');
        expect(el.children[1].style.color.toLowerCase()).toBe('rgb(255, 255, 255)');
    });

    function expectHTMLElement(el, checks) {
        checks = checks || {};

        expect(el).toEqual(jasmine.any(Object));
        expect(el.nodeType).toBe(1);

        checks.tagName && expect(el.nodeName.toLowerCase()).toBe(checks.tagName);
        checks.htmlContent && expect(el.innerHTML).toEqual(checks.htmlContent);
    }

    function createRenderer(options) {
        options = options || {};
        options.charset = htmlRenderer.CHARSET.SIMPLE;
        return htmlRenderer(options);
    }

    function createTestImage() {
        var image = new Image(2, 1);

        image.data[0] = new RGBI(0, 0, 0, 255);
        image.data[1] = new RGBI(255, 255, 255, 0);

        return image;
    }
});