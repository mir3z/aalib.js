import Rx from "rxjs";
import { expect } from "chai";

import VideoReader from "../../../src/readers/VideoReader";
import { createTestVideoElement } from "../../utils";

describe("readers/VideoReader", () => {

    it("creates Rx.Observable directly from URL", () => {
        const observable = VideoReader.fromVideoElement(createTestVideoElement(), { autoplay: true });
        expect(observable).to.be.instanceOf(Rx.Observable);
    });

    it("reads image directly from HTML Video element", done => {
        VideoReader
            .fromVideoElement(createTestVideoElement(), { autoplay: true })
            .do(video => expectTestVideo(video))
            .subscribe(() => done());
    });

    function expectTestVideo(video) {
        expect(video).not.to.be.undefined;
        expect(video.width).to.eql(100);
        expect(video.height).to.eql(100);
    }
});