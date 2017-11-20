"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = aafont;

var _utils = require("./utils");

function aafont(charset, options) {
    var table = new Array(charset.length);
    var min = 255;
    var max = 0;

    for (var i = 0; i < charset.length; i++) {
        var char = charset[i];
        var brightness = calculateBrightness(char, options);

        if (brightness < min) {
            min = brightness;
        }
        if (brightness > max) {
            max = brightness;
        }

        table[i] = { char: char, brightness: brightness };
    }

    return table.map(function (_ref) {
        var char = _ref.char,
            brightness = _ref.brightness;
        return { char: char, brightness: ~~(0, _utils.mapRange)(brightness, min, max, 0, 255) };
    }).sort(function (a, b) {
        if (a.brightness < b.brightness) return -1;
        if (a.brightness > b.brightness) return 1;
        return 0;
    });
}

function calculateBrightness(char, options) {
    var canvas = drawChar(char, options);
    var ctx = canvas.getContext("2d");
    var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data32 = new Uint32Array(idata.data.buffer);

    var brightness = 0;
    var i = data32.length;
    var r = void 0,
        g = void 0,
        b = void 0,
        pixel32 = void 0;

    while (i--) {
        pixel32 = data32[i];

        r = pixel32 & 0xff;
        g = pixel32 >> 8 & 0xff;
        b = pixel32 >> 16 & 0xff;

        brightness += (r + g + b) / 3;
    }

    brightness /= canvas.width * canvas.height;

    return brightness;
}

function drawChar(char) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$fontFamily = _ref2.fontFamily,
        fontFamily = _ref2$fontFamily === undefined ? "monospace" : _ref2$fontFamily;

    var _createCanvas = createCanvas(),
        canvas = _createCanvas.canvas,
        ctx = _createCanvas.ctx;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "20px " + fontFamily;

    ctx.fillText(char, 0, 0);

    return canvas;
}

var createCanvas = once(function () {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d", { alpha: false });

    canvas.width = 15;
    canvas.height = 25;

    return { canvas: canvas, ctx: ctx };
});

function once(func) {
    func._result = null;
    return function () {
        return func._result || (func._result = func());
    };
}