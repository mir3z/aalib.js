"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = factory;
exports.contrast = contrast;

var _linear = require("./linear");

function factory(val) {
    return function (image) {
        return contrast(image, val);
    };
}

function contrast(image) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return (0, _linear.linearTransformation)(image, val, 0);
}