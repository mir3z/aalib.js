var contrast = require('filters/contrast');
var utils = require('utils');

describe('Contrast filter', () => {
    it('should decrease contrast accordingly when value from [0, 1) is given', () => {
        var contrastFilter = contrast(0.2);

        var image = contrastFilter(utils.createTestImage());

        expect(image.data[0]).toMatchRGB(51, 0, 0);
        expect(image.data[1]).toMatchRGB(0, 51, 0);
        expect(image.data[2]).toMatchRGB(0, 0, 51);
    });

    it('should increase contrast when value > 1 is given', () => {
        var contrastFilter = contrast(100);

        var image = contrastFilter(utils.createTestImage());

        expect(image.data[0]).toMatchRGB(255, 0, 0);
        expect(image.data[1]).toMatchRGB(0, 255, 0);
        expect(image.data[2]).toMatchRGB(0, 0, 255);
    });

    it('should not change contrast when no value is given', () => {
        var contrastFilter = contrast();

        var image = contrastFilter(utils.createTestImage());

        expect(image.data[0]).toMatchRGB(255, 0, 0);
        expect(image.data[1]).toMatchRGB(0, 255, 0);
        expect(image.data[2]).toMatchRGB(0, 0, 255);
    });
});