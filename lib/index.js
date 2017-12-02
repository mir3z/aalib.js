"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.charset = exports.render = exports.filter = exports.read = exports.aa = undefined;

var _ImageReader = require("./readers/ImageReader");

var _ImageReader2 = _interopRequireDefault(_ImageReader);

var _VideoReader = require("./readers/VideoReader");

var _VideoReader2 = _interopRequireDefault(_VideoReader);

var _ImageDataReader = require("./readers/ImageDataReader");

var _ImageDataReader2 = _interopRequireDefault(_ImageDataReader);

var _linear = require("./filters/linear");

var _linear2 = _interopRequireDefault(_linear);

var _brightness = require("./filters/brightness");

var _brightness2 = _interopRequireDefault(_brightness);

var _contrast = require("./filters/contrast");

var _contrast2 = _interopRequireDefault(_contrast);

var _inverse = require("./filters/inverse");

var _inverse2 = _interopRequireDefault(_inverse);

var _desaturate = require("./filters/desaturate");

var _desaturate2 = _interopRequireDefault(_desaturate);

var _HTMLRenderer = require("./renderers/HTMLRenderer");

var _HTMLRenderer2 = _interopRequireDefault(_HTMLRenderer);

var _CanvasRenderer = require("./renderers/CanvasRenderer");

var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);

var _BaseRenderer = require("./renderers/BaseRenderer");

var _aa = require("./aa");

var _aa2 = _interopRequireDefault(_aa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.aa = _aa2.default;
var read = exports.read = {
    image: {
        fromHTMLImage: _ImageReader2.default.fromHTMLImage,
        fromURL: _ImageReader2.default.fromURL
    },

    imageData: {
        fromImageData: _ImageDataReader2.default.fromImageData,
        fromCanvas: _ImageDataReader2.default.fromCanvas
    },

    video: {
        fromVideoElement: _VideoReader2.default.fromVideoElement
    }
};

var filter = exports.filter = {
    linear: _linear2.default,
    brightness: _brightness2.default,
    contrast: _contrast2.default,
    inverse: _inverse2.default,
    desaturate: _desaturate2.default
};

var render = exports.render = {
    html: _HTMLRenderer2.default,
    canvas: _CanvasRenderer2.default
};

var charset = exports.charset = {
    SIMPLE_CHARSET: _BaseRenderer.SIMPLE_CHARSET,
    ASCII_CHARSET: _BaseRenderer.ASCII_CHARSET
};

exports.default = {
    aa: _aa2.default,
    read: read,
    filter: filter,
    render: render,
    charset: charset
};