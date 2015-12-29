var inverse = require('filters/inverse');
var utils = require('utils');

describe('Inverse filter', () => {
    it('should invert image', () => {
        var inverseFilter = inverse();

        var inverted = inverseFilter(utils.createTestImage());

        expect(inverted.data[0]).toMatchRGB(0, 255, 255);
        expect(inverted.data[1]).toMatchRGB(255, 0, 255);
        expect(inverted.data[2]).toMatchRGB(255, 255, 0);
    });
});