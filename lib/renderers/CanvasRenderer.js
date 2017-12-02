"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CanvasRenderer = exports.SIMPLE_CHARSET = exports.ASCII_CHARSET = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseRenderer2 = require("./BaseRenderer");

Object.defineProperty(exports, "ASCII_CHARSET", {
    enumerable: true,
    get: function get() {
        return _BaseRenderer2.ASCII_CHARSET;
    }
});
Object.defineProperty(exports, "SIMPLE_CHARSET", {
    enumerable: true,
    get: function get() {
        return _BaseRenderer2.SIMPLE_CHARSET;
    }
});
exports.default = factory;

var _BaseRenderer3 = _interopRequireDefault(_BaseRenderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function factory(options) {
    var renderer = new CanvasRenderer(options);
    return function (image) {
        return renderer.render(image);
    };
}

var CanvasRenderer = exports.CanvasRenderer = function (_BaseRenderer) {
    _inherits(CanvasRenderer, _BaseRenderer);

    function CanvasRenderer(options) {
        _classCallCheck(this, CanvasRenderer);

        var _this = _possibleConstructorReturn(this, (CanvasRenderer.__proto__ || Object.getPrototypeOf(CanvasRenderer)).call(this, Object.assign({}, {
            fontSize: 7,
            lineHeight: 7,
            charWidth: 4.2,
            width: 400,
            height: 300,
            background: "#fff",
            color: "#000"
        }, options)));

        _this.el = _this.options.el || document.createElement("canvas");
        _this.el.width = _this.options.width;
        _this.el.height = _this.options.height;
        _this.el.style.backgroundColor = _this.options.background;

        _this.ctx = _this.el.getContext("2d");
        _this.ctx.textBaseline = "top";
        _this.ctx.textAlign = "start";
        _this.ctx.font = _this.options.fontSize + "px " + _this.options.fontFamily;
        return _this;
    }

    _createClass(CanvasRenderer, [{
        key: "render",
        value: function render(image) {
            _get(CanvasRenderer.prototype.__proto__ || Object.getPrototypeOf(CanvasRenderer.prototype), "render", this).call(this, image);

            this.clearCanvas();

            var renderer = image.meta.colored ? colorRenderer(this.ctx, this.options) : monoRenderer(this.ctx, this.options);

            renderer(image);

            return this.el;
        }
    }, {
        key: "clearCanvas",
        value: function clearCanvas() {
            this.ctx.clearRect(0, 0, this.el.width, this.el.height);
        }
    }]);

    return CanvasRenderer;
}(_BaseRenderer3.default);

function colorRenderer(ctx, options) {
    return function (_ref) {
        var data = _ref.data,
            width = _ref.width;
        var charWidth = options.charWidth,
            lineHeight = options.lineHeight;

        var x = void 0;
        var y = void 0;
        var color = void 0;

        var i = data.length;
        while (i--) {
            x = i % width;
            y = ~~(i / width);
            color = data[i];

            ctx.fillStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
            ctx.fillText(data[i].char, x * charWidth, y * lineHeight);
        }
    };
}

function monoRenderer(ctx, options) {
    return function (_ref2) {
        var data = _ref2.data,
            width = _ref2.width;

        var lineHeight = options.lineHeight;
        var y = void 0;
        var line = "";

        ctx.fillStyle = options.color;

        for (var i = 0, length = data.length; i < length; i += width) {
            y = ~~(i / width);
            line = "";

            for (var j = i; j < i + width; j++) {
                line += data[j].char;
            }

            ctx.fillText(line, 0, y * lineHeight);
        }
    };
}