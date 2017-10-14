import Reader from "./Reader";
import Image from "../core/Image";

export default class VideoReader extends Reader {

    constructor(options) {
        super();

        this.options = Object.assign({}, { autoplay: false }, options);

        this.src = "";
        this.video = null;
        this.capturer = new VideoCapturer();

        this.loop = this.loop.bind(this);
    }

    setSrc(src) {
        this.src = src;
        if (this.video) {
            this.video.src = this.src;
        }
    }

    createVideoElement() {
        this.setVideo(document.createElement("video"));
    }

    setVideo(video) {
        this.video = video;

        if (this.options.autoplay) {
            this.video.autoplay = true;
        }
    }

    onRead(stream, error) {
        this.video.addEventListener("error", () => {
            this.video.removeEventListener("play", this.loop);
            error("Can\"t play video: " + this.video.src);
        });

        this.video.addEventListener("play", this.loop);
    }

    loop() {
        if (this.video.paused || this.video.ended) {
            return;
        }

        this.stream.write(
            Image.fromImageData(this.capturer.captureFrame(this.video))
        );

        setTimeout(this.loop, 0);
    }

    static fromURL(url, options) {
        const reader = new VideoReader(options);
        reader.createVideoElement();
        reader.setSrc(url);
        return reader.read();
    }

    static fromVideoElement(video, options) {
        const reader = new VideoReader(options);
        reader.setVideo(video);
        return reader.read();
    }
}

export class VideoCapturer {

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    captureFrame(video) {
        const w = video.videoWidth;
        const h = video.videoHeight;

        this.canvas.width = w;
        this.canvas.height = h;

        this.ctx.drawImage(video, 0, 0, w, h);

        return this.ctx.getImageData(0, 0, w, h);
    }
}
