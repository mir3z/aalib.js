"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractReader2 = require("./AbstractReader");

var _AbstractReader3 = _interopRequireDefault(_AbstractReader2);

var _AAImage = require("../core/AAImage");

var _AAImage2 = _interopRequireDefault(_AAImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageDataReader = function (_AbstractReader) {
    _inherits(ImageDataReader, _AbstractReader);

    function ImageDataReader(idata) {
        _classCallCheck(this, ImageDataReader);

        var _this = _possibleConstructorReturn(this, (ImageDataReader.__proto__ || Object.getPrototypeOf(ImageDataReader)).call(this));

        _this.idata = idata;
        return _this;
    }

    _createClass(ImageDataReader, [{
        key: "onRead",
        value: function onRead(observer) {
            observer.next(_AAImage2.default.fromImageData(this.idata));
            observer.complete();
        }
    }], [{
        key: "fromImageData",
        value: function fromImageData(idata) {
            var reader = new ImageDataReader(idata);
            return reader.read();
        }
    }, {
        key: "fromCanvas",
        value: function fromCanvas(canvas, x, y, width, height) {
            var ctx = canvas.getContext("2d");
            var idata = ctx.getImageData(x || 0, y || 0, width || canvas.width, height || canvas.height);

            return ImageDataReader.fromImageData(idata);
        }
    }]);

    return ImageDataReader;
}(_AbstractReader3.default);

exports.default = ImageDataReader;