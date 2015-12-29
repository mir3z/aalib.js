var VideoReader = require('readers/VideoReader');
var Stream = require('readers/Stream');
var videoBase64 = require('resources/video.base64');

describe('VideoReader', () => {

    it('should allow to construct a stream directly from URL', () => {
        var stream = VideoReader.fromURL(videoBase64);

        expect(stream).toEqual(jasmine.any(Stream));
    });

    it('should allow to read image directly from URL', (done) => {
        VideoReader
            .fromURL(videoBase64, { autoplay: true })
            .pipe((video) => {
                expectTestVideo(video);
                done();
            })
            .end();
    });

    it('should allow to construct a stream directly from HTML Video element', () => {
        var stream = VideoReader.fromVideoElement(createTestVideoElement(), { autoplay: true });

        expect(stream).toEqual(jasmine.any(Stream));
    });

    it('should allow to read image directly from HTML Video element', (done) => {
        VideoReader
            .fromVideoElement(createTestVideoElement(), { autoplay: true })
            .pipe((video) => {
                expectTestVideo(video);
                done();
            })
            .end();
    });

    function createTestVideoElement() {
        var video = document.createElement('video');
        video.src = videoBase64;
        return video;
    }

    function expectTestVideo(video) {
        expect(video).not.toBeNull();
        expect(video.width).toBe(100);
        expect(video.height).toBe(100);
    }
});