var canvasRenderer = require('renderers/CanvasRenderer');
var Image = require('core/Image');
var RGBI = require('core/RGBI');

describe('CanvasRenderer', () => {

    it('should render as Canvas element', () => {
        var render = createRenderer();

        var el = render(createTestImage());

        expect(el).toEqual(jasmine.any(Object));
        expect(el.nodeType).toBe(1);
        expect(el.nodeName.toLowerCase()).toBe('canvas');
    });

    it('should set canvas size if given', () => {
        var render = createRenderer({ width: 100, height: 110 });

        var el = render(createTestImage());

        expect(el.width).toBe(100);
        expect(el.height).toBe(110);
    });

    it('should render monochrome by default', () => {
        var render = createRenderer();
        var monochroneSpy = spyOn(canvasRenderer.Class.prototype, 'renderMonochrome');

        render(createTestImage());

        expect(monochroneSpy).toHaveBeenCalled();
    });

    it('should preserve colors if enabled', () => {
        var render = createRenderer();
        var colorfulSpy = spyOn(canvasRenderer.Class.prototype, 'renderColorful');
        var image = createTestImage();
        image.colorful = true;

        render(image);

        expect(colorfulSpy).toHaveBeenCalled();
    });

    function createRenderer(options) {
        return canvasRenderer(options);
    }

    function createTestImage() {
        var image = new Image(2, 1);

        image.data[0] = new RGBI(0, 0, 0, 255);
        image.data[1] = new RGBI(255, 255, 255, 0);

        return image;
    }
});