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

var ImageReader = function (_AbstractReader) {
    _inherits(ImageReader, _AbstractReader);

    function ImageReader(url) {
        _classCallCheck(this, ImageReader);

        var _this = _possibleConstructorReturn(this, (ImageReader.__proto__ || Object.getPrototypeOf(ImageReader)).call(this));

        _this.url = url;
        return _this;
    }

    _createClass(ImageReader, [{
        key: "onRead",
        value: function onRead(observer) {
            var img = document.createElement("img");
            img.crossOrigin = "Anonymous";

            var onLoad = function onLoad() {
                removeListeners();
                observer.next(_AAImage2.default.fromHTMLImageElement(img));
                observer.complete();
            };

            var onError = function onError(e) {
                removeListeners();
                observer.error(e);
            };

            var removeListeners = function removeListeners() {
                img.removeEventListener("load", onLoad);
                img.removeEventListener("error", onError);
            };

            img.addEventListener("load", onLoad);
            img.addEventListener("error", onError);

            if (img.complete && img.naturalWidth) {
                onLoad();
            } else if (this.url) {
                img.src = this.url;
            }
        }
    }], [{
        key: "fromURL",
        value: function fromURL(url) {
            var reader = new ImageReader(url);
            return reader.read();
        }
    }, {
        key: "fromHTMLImage",
        value: function fromHTMLImage(img) {
            return ImageReader.fromURL(img.src);
        }
    }]);

    return ImageReader;
}(_AbstractReader3.default);

exports.default = ImageReader;