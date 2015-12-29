var linear = require('filters/linear');
var utils = require('utils');

describe('Linear filter', () => {
    it('should apply linear transformation', () => {
        var linearFilter = linear(0.2, -10);

        var image = linearFilter(utils.createTestImage());

        expect(image.data[0]).toMatchRGB(41, 0, 0);
        expect(image.data[1]).toMatchRGB(0, 41, 0);
        expect(image.data[2]).toMatchRGB(0, 0, 41);
    });
});
