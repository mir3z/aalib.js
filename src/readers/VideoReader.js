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

    createVideoElement(url) {
        const video = document.createElement('video');
        video.src = url;
        video.crossOrigin = 'anonymous';
        video.controls = true; // Optional: Adds video controls for debugging
        document.body.appendChild(video); // Optional: Appends video to the DOM for visibility
        return video;
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
            observer.error(`Error occurred while trying to play ${src}: ${code}, ${message}`);
        };

        video.addEventListener("error", this.onError);
        video.addEventListener("play", this.playbackLoop);

        if (this.options.autoplay) {
            video.play();
        }
    }

    onDispose() {
        this.video.removeEventListener("play", this.playbackLoop);
        this.video.removeEventListener("error", this.onError);
        if (this.video.parentNode) {
            this.video.parentNode.removeChild(this.video); // Remove video element from DOM
        }
    }

    static fromVideoElement(video, options) {
        console.log("read from video element");
        const reader = new VideoReader(video, createVideoCapture(), options);
        return reader.read();

    }

    static fromURL(url, options) {
        console.log(`read from url ${url}`);
        const reader = new VideoReader(url, createVideoCapture(), options);
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
