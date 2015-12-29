var Renderer = require('renderers/Renderer');
var Image = require('core/Image');
var RGBI = require('core/RGBI');

describe('Renderer', () => {

    it('should match character to given brightness level', () => {
        var renderer = createRenderer();

        expect(renderer.matchChar(255)).toBe('.');
        expect(renderer.matchChar(0)).toBe('M');
    });

    it('should render image using given charset', () => {
        var renderer = createRenderer();

        var image = renderer.render(createTestImage());

        expect(image.data[0].char).toBe('.');
        expect(image.data[1].char).toBe('M');
    });

    function createRenderer() {
        return new Renderer({
            charset: Renderer.CHARSET.SIMPLE
        });
    }

    function createTestImage() {
        var image = new Image(2, 1);

        image.data[0] = new RGBI(0, 0, 0, 255);
        image.data[1] = new RGBI(255, 255, 255, 0);

        return image;
    }
});