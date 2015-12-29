var aa = require('aa');
var utils = require('utils');

describe('aa', () => {

    it('should convert RGB Image to RGBI Image', () => {
        var testImage = utils.createTestImage();

        var out = aa({ width: testImage.width, height: testImage.height })(testImage);

        expect(out.width).toEqual(testImage.width);
        expect(out.height).toEqual(testImage.height);
        expect(out.data.length).toEqual(testImage.data.length);
        expect(out.data[0]).toMatchRGBI(255, 0, 0, 0);
        expect(out.data[1]).toMatchRGBI(0, 255, 0, 0);
        expect(out.data[2]).toMatchRGBI(0, 0, 255, 0);
    });
});