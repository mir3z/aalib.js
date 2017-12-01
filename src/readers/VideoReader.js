import AbstractReader from "./AbstractReader";
import AAImage from "../core/AAImage";

export default class VideoReader extends AbstractReader {
    constructor(video, captureFrame, options) {
        super();

        this.video = video;
        this.options = Object.assign({}, { autoplay: false }, options);
        this.video.autoplay = this.options.autoplay;

        this.captureFrame = captureFrame;
    }

    onRead(observer) {
        const video = this.video;

        this.playbackLoop = () => {
            if (video.paused || video.ended) {
                return;
            }

            observer.next(AAImage.fromImageData(this.captureFrame(video)));

            requestAnimationFrame(this.playbackLoop);
        };

        this.onError = () => {
            const { src, error: { code, message } } = video;

            video.removeEventListener("play", this.playbackLoop);
            observer.error(`Error occurred while trying to play ${ src }: : ${ code }, ${ message }`);
        };

        video.addEventListener("error", this.onError);
        video.addEventListener("play", this.playbackLoop);
    }

    onDispose() {
        this.video.removeEventListener("play", this.playbackLoop);
        this.video.removeEventListener("error", this.onError);
    }

    static fromVideoElement(video, options) {
        const reader = new VideoReader(video, createVideoCapture(), options);
        return reader.read();
    }
}

function createVideoCapture() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    return function capture(video) {
        const w = video.videoWidth;
        const h = video.videoHeight;

        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(video, 0, 0, w, h);

        return ctx.getImageData(0, 0, w, h);
    };
}
