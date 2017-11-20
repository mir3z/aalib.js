"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SIMPLE_CHARSET = exports.ASCII_CHARSET = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../utils");

var _aafont = require("../aafont");

var _aafont2 = _interopRequireDefault(_aafont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseRenderer = function () {
    function BaseRenderer(options) {
        _classCallCheck(this, BaseRenderer);

        this.options = Object.assign({}, {
            charset: ASCII_CHARSET,
            fontFamily: "monospace"
        }, options);

        this.fontmap = BaseRenderer.buildFont(this.options.charset, {
            fontFamily: this.options.fontFamily
        });

        this.matchChar = memoize(this.matchChar.bind(this));
    }

    _createClass(BaseRenderer, [{
        key: "render",
        value: function render(image) {
            return this.processImage(image);
        }
    }, {
        key: "processImage",
        value: function processImage(image) {
            var i = image.data.length;
            var pixel = void 0;

            while (i--) {
                pixel = image.data[i];
                pixel.char = this.matchChar(pixel.mono);
            }

            return image;
        }
    }, {
        key: "matchChar",
        value: function matchChar(monoValue) {
            var match = { brightness: -1 };

            for (var i = 0; i < this.fontmap.length; i++) {
                var tuple = this.fontmap[i];

                if (Math.abs(monoValue - tuple.brightness) <= Math.abs(monoValue - match.brightness)) {
                    match = tuple;
                } else {
                    return match.char;
                }
            }

            return match.char;
        }
    }], [{
        key: "buildFont",
        value: function buildFont(charset, options) {
            return (0, _aafont2.default)(charset, options);
        }
    }]);

    return BaseRenderer;
}();

exports.default = BaseRenderer;
var ASCII_CHARSET = exports.ASCII_CHARSET = (0, _utils.range)(32, 126).map(function (code) {
    return String.fromCharCode(code);
});
var SIMPLE_CHARSET = exports.SIMPLE_CHARSET = [".", ":", "*", "I", "$", "V", "F", "N", "M"];

function memoize(func) {
    func._cache = [];
    return function (arg) {
        return func._cache[arg] || (func._cache[arg] = func(arg));
    };
}