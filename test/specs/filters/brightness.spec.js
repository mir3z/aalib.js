var brightness = require('filters/brightness');
var utils = require('utils');

describe('Brightness filter', () => {
    it('should decrease brightness when negative value is given', () => {
        var brightnessFilter = brightness(-10);

        var image = brightnessFilter(utils.createTestImage());

        expect(image.data[0]).toMatchRGB(245, 0, 0);
        expect(image.data[1]).toMatchRGB(0, 245, 0);
        expect(image.data[2]).toMatchRGB(0, 0, 245);
    });

    it('should increase brightness when positive value is given', () => {
        var brightnessFilter = brightness(10);

        var image = brightnessFilter(utils.createTestImage());

        expect(image.data[0]).toMatchRGB(255, 10, 10);
        expect(image.data[1]).toMatchRGB(10, 255, 10);
        expect(image.data[2]).toMatchRGB(10, 10, 255);
    });

    it('should not change brightness when no value is given', () => {
        var brightnessFilter = brightness();

        var image = brightnessFilter(utils.createTestImage());

        expect(image.data[0]).toMatchRGB(255, 0, 0);
        expect(image.data[1]).toMatchRGB(0, 255, 0);
        expect(image.data[2]).toMatchRGB(0, 0, 255);
    });
});