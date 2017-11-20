"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = factory;
exports.brightness = brightness;

var _linear = require("./linear");

var _linear2 = _interopRequireDefault(_linear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function factory(val) {
    return function (image) {
        return brightness(image, val);
    };
}

function brightness(image, val) {
    return (0, _linear2.default)(1, val || 0)(image);
}