"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require("../utils");

exports.default = {
    mul: function mul(color, v) {
        color.r = ~~(color.r * v);
        color.g = ~~(color.g * v);
        color.b = ~~(color.b * v);

        return this;
    },
    add: function add(color, v) {
        color.r += v;
        color.g += v;
        color.b += v;

        return this;
    },
    addc: function addc(color, _ref) {
        var r = _ref.r,
            g = _ref.g,
            b = _ref.b;

        color.r += r;
        color.g += g;
        color.b += b;

        return this;
    },
    div: function div(color, v) {
        return this.mul(color, 1.0 / v);
    },
    inverse: function inverse(color) {
        color.r = 255 - color.r;
        color.g = 255 - color.g;
        color.b = 255 - color.b;

        return this;
    },
    getGrayscale: function getGrayscale(color) {
        return ~~((color.r + color.g + color.b) / 3);
    },
    desaturate: function desaturate(color) {
        color.r = color.g = color.b = this.getGrayscale(color);

        return this;
    },
    clamp: function clamp(color) {
        color.r = (0, _utils.clampByte)(color.r);
        color.g = (0, _utils.clampByte)(color.g);
        color.b = (0, _utils.clampByte)(color.b);

        return this;
    }
};