var ImageDataReader = require('readers/ImageDataReader');

describe('ImageDataReader', () => {

    it('should allow to construct a stream from image data', (done) => {
        var idata = {data: new Uint8Array([1,2,3,4]), width: 1, height: 1};
        ImageDataReader.fromImageData(idata)
            .pipe((image) => {
                expectTestImage(image);
                done();
            })
            .end();
    });

    function expectTestImage(image) {
        expect(image.data[0]).toMatchRGB(1, 2, 3);
    }
});