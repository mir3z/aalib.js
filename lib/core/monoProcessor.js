"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require("../utils");

exports.default = {
    mul: function mul(color, v) {
        color.mono = ~~(color.mono * v);
        return this;
    },
    add: function add(color, v) {
        color.mono += v;
        return this;
    },
    div: function div(color, v) {
        this.mul(color, 1.0 / v);
    },
    inverse: function inverse(color) {
        color.mono = 255 - color.mono;
        return this;
    },
    desaturate: function desaturate(color) {
        color.r = color.g = color.b = color.mono;
        return color;
    },
    clamp: function clamp(color) {
        color.mono = (0, _utils.clampByte)(color.mono);
        return this;
    }
};