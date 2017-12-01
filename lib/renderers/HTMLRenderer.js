"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HTMLRenderer = exports.SIMPLE_CHARSET = exports.ASCII_CHARSET = undefined;

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
    var renderer = new HTMLRenderer(options);

    return function (data) {
        return renderer.render(data);
    };
}

var HTMLRenderer = exports.HTMLRenderer = function (_BaseRenderer) {
    _inherits(HTMLRenderer, _BaseRenderer);

    function HTMLRenderer(options) {
        _classCallCheck(this, HTMLRenderer);

        var _this = _possibleConstructorReturn(this, (HTMLRenderer.__proto__ || Object.getPrototypeOf(HTMLRenderer)).call(this, Object.assign({}, {
            tagName: "pre",
            fontSize: 7,
            background: "#fff",
            color: "#000"
        }, options)));

        _this.el = _this.options.el || document.createElement(_this.options.tagName);
        _this.el.style.fontSize = _this.options.fontSize + "px";
        _this.el.style.fontFamily = _this.options.fontFamily;
        _this.el.style.backgroundColor = _this.options.background;
        return _this;
    }

    _createClass(HTMLRenderer, [{
        key: "render",
        value: function render(image) {
            _get(HTMLRenderer.prototype.__proto__ || Object.getPrototypeOf(HTMLRenderer.prototype), "render", this).call(this, image);

            if (!image.meta.colored) {
                this.el.style.color = this.options.color;
            }

            var renderer = image.meta.colored ? colorRenderer(this.el) : monoRenderer(this.el);

            return renderer(image);
        }
    }]);

    return HTMLRenderer;
}(_BaseRenderer3.default);

function colorRenderer(el) {
    var wrapInColor = function wrapInColor(_ref) {
        var char = _ref.char,
            r = _ref.r,
            g = _ref.g,
            b = _ref.b;
        return "<span style=\"color: rgb(" + r + ", " + g + ", " + b + ")\">" + char + "</span>";
    };

    var toString = stringRenderer(wrapInColor);

    return function (image) {
        el.innerHTML = toString(image);
        return el;
    };
}

function monoRenderer(el) {
    var toString = stringRenderer(function (_ref2) {
        var char = _ref2.char;
        return char;
    });

    return function (image) {
        el.textContent = toString(image);
        return el;
    };
}

function stringRenderer(renderPixel) {
    return function (_ref3) {
        var width = _ref3.width,
            data = _ref3.data;

        var str = "";
        var w = width;

        for (var i = 0, length = data.length; i < length; i++, w--) {
            if (w === 0) {
                str += "\n";
                w = width;
            }

            str += renderPixel(data[i]);
        }

        return str;
    };
}