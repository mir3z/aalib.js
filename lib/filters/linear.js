"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = factory;
exports.linearTransformation = linearTransformation;
function factory(alpha, beta) {
    return function (image) {
        return linearTransformation(image, alpha, beta);
    };
}

function linearTransformation(image, alpha, beta) {
    return image.process(function (color, processor) {
        processor.mul(color, alpha).add(color, beta).clamp(color);
    });
}