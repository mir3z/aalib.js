"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = factory;
exports.desaturate = desaturate;
function factory() {
    return function (image) {
        return desaturate(image);
    };
}

function desaturate(image) {
    return image.process(function (color, processor) {
        processor.desaturate(color);
    });
}