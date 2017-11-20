"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rgbProcessor = require("./rgbProcessor");

var _rgbProcessor2 = _interopRequireDefault(_rgbProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AAImage = function () {
    function AAImage() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            width = _ref.width,
            height = _ref.height,
            colorProcessor = _ref.colorProcessor,
            _ref$data = _ref.data,
            data = _ref$data === undefined ? [] : _ref$data,
            _ref$meta = _ref.meta,
            meta = _ref$meta === undefined ? {} : _ref$meta;

        _classCallCheck(this, AAImage);

        this.width = width;
        this.height = height;
        this.data = data;
        this.meta = meta;
        this.colorProcessor = colorProcessor;
    }

    _createClass(AAImage, [{
        key: "getAt",
        value: function getAt(x, y) {
            return this.data[x + this.width * y];
        }
    }, {
        key: "process",
        value: function process(fn) {
            var _this = this;

            this.data.forEach(function (pt) {
                fn(pt, _this.colorProcessor);
            });

            return this;
        }
    }, {
        key: "toImageData",
        value: function toImageData() {
            var data = [];
            var color = void 0;

            for (var i = 0; i < this.data.length; i++) {
                color = this.data[i];

                data[data.length] = color.r;
                data[data.length] = color.g;
                data[data.length] = color.b;
                data[data.length] = 255;
            }

            return new ImageData(new Uint8ClampedArray(data), this.width, this.height);
        }
    }], [{
        key: "fromImageData",
        value: function fromImageData(idata) {
            var data32 = new Uint32Array(idata.data.buffer);
            var length = data32.length;
            var data = new Array(length);

            var i = length;
            var pixel32 = void 0;

            while (i--) {
                pixel32 = data32[i];

                data[i] = {
                    r: pixel32 & 0xff,
                    g: pixel32 >> 8 & 0xff,
                    b: pixel32 >> 16 & 0xff
                };
            }

            return new AAImage({
                data: data,
                width: idata.width,
                height: idata.height,
                colorProcessor: _rgbProcessor2.default
            });
        }
    }, {
        key: "fromHTMLImageElement",
        value: function fromHTMLImageElement(image) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var naturalWidth = image.naturalWidth,
                naturalHeight = image.naturalHeight;


            canvas.width = naturalWidth;
            canvas.height = naturalHeight;
            ctx.drawImage(image, 0, 0);

            return AAImage.fromImageData(ctx.getImageData(0, 0, naturalWidth, naturalHeight));
        }
    }]);

    return AAImage;
}();

exports.default = AAImage;