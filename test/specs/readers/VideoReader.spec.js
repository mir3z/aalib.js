import { expect } from "chai";

import VideoReader from "../../../src/readers/VideoReader";
import Stream from "../../../src/readers/Stream";
import videoBase64 from "../../resources/video.base64";

describe("readers/VideoReader", () => {

    it("allows to construct a stream directly from URL", () => {
        const stream = VideoReader.fromURL(videoBase64);

        expect(stream).to.be.instanceOf(Stream);
    });

    it("allows to read image directly from URL", done => {
        VideoReader
            .fromURL(videoBase64, { autoplay: true })
            .pipe(video => {
                expectTestVideo(video);
                done();
            })
            .end();
    });

    it("allows to construct a stream directly from HTML Video element", () => {
        const stream = VideoReader.fromVideoElement(createTestVideoElement(), { autoplay: true });

        expect(stream).to.be.instanceOf(Stream);
    });

    it("allows to read image directly from HTML Video element", done => {
        VideoReader
            .fromVideoElement(createTestVideoElement(), { autoplay: true })
            .pipe(video => {
                expectTestVideo(video);
                done();
            })
            .end();
    });

    function createTestVideoElement() {
        const video = document.createElement("video");
        video.src = videoBase64;
        return video;
    }

    function expectTestVideo(video) {
        expect(video).not.to.be.undefined;
        expect(video.width).to.eql(100);
        expect(video.height).to.eql(100);
    }
});