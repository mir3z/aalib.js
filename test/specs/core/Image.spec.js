var Image = require('core/Image');
var rgbBase64Image = require('resources/rgb.base64');

describe('Image object', () => {

    it('should set default values', () => {
        var image = new Image(5, 10);

        expect(image.width).toBe(5);
        expect(image.height).toBe(10);
        expect(image.data).toEqual([]);
    });

    it('should retrieve value at given position', () => {
        var image = new Image(2, 3);
        image.data = [
            '0.0', '1.0',
            '0.1', '1.1',
            '0.2', '1.2'
        ];

        expect(image.getAt(0, 0)).toBe('0.0');
        expect(image.getAt(1, 1)).toBe('1.1');
        expect(image.getAt(0, 2)).toBe('0.2');
        expect(image.getAt(2, 2)).toBe(void 0);
    });

    it('should apply filter to image data', () => {
        var image = new Image(1, 3);
        image.data = [{ val: 5 }, { val: 10 }, { val: 15 }];

        image.filter((obj) => { obj.val += 100; });

        expect(image.data).toEqual([{ val: 105 }, { val: 110 }, { val: 115 }]);
    });

    it('should convert itself to ImageData', () => {
        var image = new Image(1, 3);
        image.data = [
            { r: 10, g: 20, b: 30 },
            { r: 40, g: 50, b: 60 },
            { r: 70, g: 80, b: 90 }
        ];

        var idata = image.toImageData();

        expect(idata instanceof ImageData).toBeTruthy();
        expect(idata.width).toBe(1);
        expect(idata.height).toBe(3);
        expect(Array.prototype.slice.call(idata.data)).toEqual([
            10, 20, 30, 255,
            40, 50, 60, 255,
            70, 80, 90, 255
        ]);
    });

    it('should create itself from ImageData', () => {
        var idata = new ImageData(
            new Uint8ClampedArray([
                10, 20, 30, 0,
                40, 50, 60, 10
            ]),
            1, 2
        );

        var image = Image.fromImageData(idata);

        expect(image.width).toBe(1);
        expect(image.height).toBe(2);
        expect(image.data.length).toBe(2);
        expect(image.data[0]).toMatchRGB(10, 20, 30);
        expect(image.data[1]).toMatchRGB(40, 50, 60);
    });

    it('should create itself from HTMLImage', (done) => {
        var img = document.createElement('img');
        img.onload = expectImage;
        img.src = rgbBase64Image;

        function expectImage() {
            var image = Image.fromHTMLImageElement(img);

            expect(image.width).toBe(3);
            expect(image.height).toBe(1);
            expect(image.data.length).toBe(3);
            expect(image.data[0]).toMatchRGB(255, 0, 0);
            expect(image.data[1]).toMatchRGB(0, 255, 0);
            expect(image.data[2]).toMatchRGB(0, 0, 255);

            done();
        }
    });
});