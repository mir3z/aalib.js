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

var VideoReader = function (_AbstractReader) {
    _inherits(VideoReader, _AbstractReader);

    function VideoReader(video, captureFrame, options) {
        _classCallCheck(this, VideoReader);

        var _this = _possibleConstructorReturn(this, (VideoReader.__proto__ || Object.getPrototypeOf(VideoReader)).call(this));

        _this.video = video;
        _this.options = Object.assign({}, { autoplay: false }, options);
        _this.video.autoplay = _this.options.autoplay;

        _this.captureFrame = captureFrame;
        return _this;
    }

    _createClass(VideoReader, [{
        key: "onRead",
        value: function onRead(observer) {
            var _this2 = this;

            var video = this.video;

            this.playbackLoop = function () {
                if (video.paused || video.ended) {
                    return;
                }

                observer.next(_AAImage2.default.fromImageData(_this2.captureFrame(video)));

                requestAnimationFrame(_this2.playbackLoop);
            };

            this.onError = function () {
                var src = video.src,
                    _video$error = video.error,
                    code = _video$error.code,
                    message = _video$error.message;


                video.removeEventListener("play", _this2.playbackLoop);
                observer.error("Error occurred while trying to play " + src + ": : " + code + ", " + message);
            };

            video.addEventListener("error", this.onError);
            video.addEventListener("play", this.playbackLoop);
        }
    }, {
        key: "onDispose",
        value: function onDispose() {
            this.video.removeEventListener("play", this.playbackLoop);
            this.video.removeEventListener("error", this.onError);
        }
    }], [{
        key: "fromVideoElement",
        value: function fromVideoElement(video, options) {
            var reader = new VideoReader(video, createVideoCapture(), options);
            return reader.read();
        }
    }]);

    return VideoReader;
}(_AbstractReader3.default);

exports.default = VideoReader;


function createVideoCapture() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    return function capture(video) {
        var w = video.videoWidth;
        var h = video.videoHeight;

        canvas.width = w;
        canvas.height = h;

        ctx.drawImage(video, 0, 0, w, h);

        return ctx.getImageData(0, 0, w, h);
    };
}