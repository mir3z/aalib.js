import rgbProcessor from "./rgbProcessor";

export default class AAImage {

    constructor({ width, height, colorProcessor, data = [], meta = {} } = {}) {
        this.width = width;
        this.height = height;
        this.data = data;
        this.meta = meta;
        this.colorProcessor = colorProcessor;
    }

    getAt(x, y) {
        return this.data[x + this.width * y];
    }

    process(fn) {
        this.data.forEach(pt => {
            fn(pt, this.colorProcessor);
        });

        return this;
    }

    toImageData() {
        const data = [];
        let color;

        for (let i = 0; i < this.data.length; i++) {
            color = this.data[i];

            data[data.length] = color.r;
            data[data.length] = color.g;
            data[data.length] = color.b;
            data[data.length] = 255;
        }

        return new ImageData(
            new Uint8ClampedArray(data),
            this.width,
            this.height
        );
    }

    static fromImageData(idata) {
        const data32 = new Uint32Array(idata.data.buffer);
        const length = data32.length;
        const data = new Array(length);

        let i = length;
        let pixel32;

        while (i--) {
            pixel32 = data32[i];

            data[i] = {
                r: pixel32 & 0xff,
                g: (pixel32 >> 8) & 0xff,
                b: (pixel32 >> 16) & 0xff
            };
        }

        return new AAImage({
            data,
            width: idata.width,
            height: idata.height,
            colorProcessor: rgbProcessor
        });
    }

    static fromHTMLImageElement(image) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const { naturalWidth, naturalHeight } = image;

        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        ctx.drawImage(image, 0, 0);

        return AAImage.fromImageData(
            ctx.getImageData(0, 0, naturalWidth, naturalHeight)
        );
    }
}