var utils = require('./utils');
var each = require('lodash/collection/each');
var map = require('lodash/collection/map');

function aafont(charset, options) {
    var table = [];
    var min = 255, max = 0;

    each(charset, (char) => {
        var brightness = calculateBrightness(char, options);

        if (brightness < min) {
            min = brightness;
        }
        if (brightness > max) {
            max = brightness;
        }

        table.push([char, brightness]);
    });

    table = map(table, (entry) => {
        return [entry[0], Math.floor(utils.mapRange(entry[1], min, max, 0, 255))];
    });

    table = table.sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
    });

    return table;
}

function calculateBrightness(char, options) {
    var canvas = drawChar(char, options);
    var ctx = canvas.getContext('2d');
    var brightness = 0;
    var r, g, b;

    var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < idata.data.length; i += 4) {
        r = idata.data[i];
        g = idata.data[i+1];
        b = idata.data[i+2];

        brightness += (r + g + b) / 3;
    }

    brightness /= canvas.width * canvas.height;

    return brightness;
}

function drawChar(char, options) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d', { alpha: false });
    var font = options && options.fontFamily || 'monospace';

    canvas.width = 15;
    canvas.height = 25;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '20px ' + font;

    ctx.fillText(char, 0, 0);

    return canvas;
}

module.exports = aafont;
