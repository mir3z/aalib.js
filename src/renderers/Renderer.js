import { range } from "../utils";
import aafont from "../aafont";

const ASCII_CHARSET = range(32, 126).map(code => String.fromCharCode(code));
const SIMPLE_CHARSET = [".", ":", "*", "I", "$", "V", "F", "N", "M"];

export default class Renderer {
    constructor(options) {
        this.options = Object.assign({}, {
            charset: ASCII_CHARSET,
            fontFamily: "monospace"
        }, options);

        this.fontmap = Renderer.buildFont(this.options.charset, {
            fontFamily: this.options.fontFamily
        });

        this.matchChar = memoize(this.matchChar.bind(this));
    }

    render(image) {
        return this.processImage(image);
    }

    processImage(image) {
        for (let i = 0; i < image.data.length; i++) {
            image.data[i].char = this.matchChar(image.data[i].intensity);
        }

        return image;
    }

    matchChar(val) {
        let matched = this.fontmap[0];

        if (matched[0] === val) {
            return matched[0];
        }

        for (let i = 0; i < this.fontmap.length; i++) {
            const tuple = this.fontmap[i];

            if (Math.abs(val - tuple[1]) < Math.abs(val - matched[1])) {
                matched = tuple;
            }
        }

        return matched[0];
    }

    static buildFont(charset, options) {
        return aafont(charset, options);
    }
}

function memoize(func) {
    func._cache = [];
    return (arg) => func._cache[arg] || (func._cache[arg] = func(arg));
}

Renderer.CHARSET = {
    ASCII: ASCII_CHARSET,
    SIMPLE: SIMPLE_CHARSET
};