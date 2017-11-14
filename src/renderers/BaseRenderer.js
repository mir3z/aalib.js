import { range } from "../utils";
import aafont from "../aafont";

export default class BaseRenderer {
    constructor(options) {
        this.options = Object.assign({}, {
            charset: ASCII_CHARSET,
            fontFamily: "monospace"
        }, options);

        this.fontmap = BaseRenderer.buildFont(this.options.charset, {
            fontFamily: this.options.fontFamily
        });

        this.matchChar = memoize(this.matchChar.bind(this));
    }

    render(image) {
        return this.processImage(image);
    }

    processImage(image) {
        let i = image.data.length;
        let pixel;

        while (i--) {
            pixel = image.data[i];
            pixel.char = this.matchChar(pixel.mono);
        }

        return image;
    }

    matchChar(monoValue) {
        let match = { brightness: -1 };

        for (let i = 0; i < this.fontmap.length; i++) {
            const tuple = this.fontmap[i];

            if (Math.abs(monoValue - tuple.brightness) <= Math.abs(monoValue - match.brightness)) {
                match = tuple;
            } else {
                return match.char;
            }
        }

        return match.char;
    }

    static buildFont(charset, options) {
        return aafont(charset, options);
    }
}

export const ASCII_CHARSET = range(32, 126).map(code => String.fromCharCode(code));
export const SIMPLE_CHARSET = [".", ":", "*", "I", "$", "V", "F", "N", "M"];

function memoize(func) {
    func._cache = [];
    return (arg) => func._cache[arg] || (func._cache[arg] = func(arg));
}