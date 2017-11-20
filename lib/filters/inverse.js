"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = factory;
exports.inverse = inverse;
function factory() {
    return function (image) {
        return inverse(image);
    };
}

function inverse(image) {
    return image.process(function (color, processor) {
        processor.inverse(color).clamp(color);
    });
}