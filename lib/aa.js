"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = factory;
exports.aa = aa;

var _AAImage = require("./core/AAImage");

var _AAImage2 = _interopRequireDefault(_AAImage);

var _monoProcessor = require("./core/monoProcessor");

var _monoProcessor2 = _interopRequireDefault(_monoProcessor);

var _rgbProcessor = require("./core/rgbProcessor");

var _rgbProcessor2 = _interopRequireDefault(_rgbProcessor);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function factory(options) {
    return function (image) {
        return aa(image, options);
    };
}

function aa(image, options) {
    var width = options.width,
        height = options.height,
        _options$colored = options.colored,
        colored = _options$colored === undefined ? false : _options$colored;


    var bw = image.width / width;
    var bh = image.height / height;

    var minMono = 255;
    var maxMono = 0;

    var data = new Array(width * height);
    var k = 0;

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {

            var color = analyzeColors(image, ~~(j * bw), ~~(i * bh), bw, bh);

            if (color.mono > maxMono) {
                maxMono = color.mono;
            }
            if (color.mono < minMono) {
                minMono = color.mono;
            }

            data[k++] = color;
        }
    }

    var aaImage = new _AAImage2.default({
        width: width,
        height: height,
        data: data,
        colorProcessor: _monoProcessor2.default,
        meta: { colored: colored }
    });

    normalizeGrayscale(aaImage, minMono, maxMono);

    return aaImage;
}

function analyzeColors(image, x, y, width, height) {
    var avgColor = { r: 0, g: 0, b: 0 };
    var count = 0;

    for (var row = 0; row < height; row++) {
        for (var col = 0; col < width; col++) {
            _rgbProcessor2.default.addc(avgColor, image.getAt(x + col, y + row));
            count++;
        }
    }

    _rgbProcessor2.default.div(avgColor, count);

    return {
        r: avgColor.r,
        g: avgColor.g,
        b: avgColor.b,
        mono: _rgbProcessor2.default.getGrayscale(avgColor)
    };
}

function normalizeGrayscale(img, a, b) {
    img.process(function (color) {
        color.mono = ~~(0, _utils.mapRange)(color.mono, a, b, 0, 255);
    });
}