var defaults = require('lodash/object/defaults');
var range = require('lodash/utility/range');
var map = require('lodash/collection/map');

var aafont = require('../aafont');

var ASCII_CHARSET = map(range(32, 127), (code) => String.fromCharCode(code));
var SIMPLE_CHARSET = ['.', ':', '*', 'I', '$', 'V', 'F', 'N', 'M'];

class Renderer {
    constructor(options) {
        this.options = defaults(options || {}, {
            charset: ASCII_CHARSET,
            fontFamily: 'monospace'
        });

        this.fontmap = Renderer.buildFont(this.options.charset, {
            fontFamily: this.options.fontFamily
        });

        this.matchChar = memoize(this.matchChar.bind(this));
    }

    render(image) {
        return this.processImage(image);
    }

    processImage(image) {

        for (var i = 0; i < image.data.length; i++) {
            image.data[i].char = this.matchChar(image.data[i].intensity);
        }

        return image;
    }

    matchChar(val) {
        var matched = this.fontmap[0];

        if (matched[0] === val) {
            return matched[0];
        }

        for (var i = 0; i < this.fontmap.length; i++) {
            var tuple = this.fontmap[i];

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

module.exports = Renderer;