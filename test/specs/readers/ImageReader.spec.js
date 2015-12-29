var ImageReader = require('readers/ImageReader');
var Stream = require('readers/Stream');
var rgbBase64Image = require('resources/rgb.base64');

describe('ImageReader', () => {

    it('should allow to construct a stream directly from URL', () => {
        var stream = ImageReader.fromURL(rgbBase64Image);

        expect(stream).toEqual(jasmine.any(Stream));
    });

    it('should allow to read image directly from URL', (done) => {
        ImageReader
            .fromURL(rgbBase64Image)
            .pipe((image) => {
                expectTestImage(image);
                done();
            })
            .end();
    });

    it('should allow to construct a stream directly from HTMLImageElement', () => {
        var stream = ImageReader.fromImg(createTestHTMLImage());

        expect(stream).toEqual(jasmine.any(Stream));
    });

    it('should allow to read image directly from HTMLImageElement', (done) => {
        ImageReader
            .fromImg(createTestHTMLImage())
            .pipe((image) => {
                expectTestImage(image);
                done();
            })
            .end();
    });

    function createTestHTMLImage() {
        var img = new Image();
        img.src = rgbBase64Image;
        return img;
    }

    function expectTestImage(image) {
        expect(image.data[0]).toMatchRGB(255, 0, 0);
        expect(image.data[1]).toMatchRGB(0, 255, 0);
        expect(image.data[2]).toMatchRGB(0, 0, 255);
    }
});