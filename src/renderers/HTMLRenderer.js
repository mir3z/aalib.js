var defaults = require('lodash/object/defaults');
var Renderer = require('./Renderer');
var map = require('lodash/collection/map');

class HTMLRenderer extends Renderer {

    constructor(options) {
        super(defaults(options || {}, {
            tagName: 'pre'
        }));

        this.el = this.options.el || document.createElement(this.options.tagName);
        this.el.style.fontFamily = this.options.fontFamily;
    }

    render(image) {
        super.render(image);

        if (image.colorful) {
            this.colorize(image.data);
        }

        var content = splitLines(image.data, image.width);

        if (image.colorful) {
            this.el.innerHTML = content;
        } else {
            this.el.textContent = content;
        }

        return this.el;
    }

    colorize(pixels) {
        return map(pixels, (pixel) => {
            pixel.char = `<span style="color: rgb(${ pixel.r }, ${ pixel.g }, ${ pixel.b })">${ pixel.char }</span>`;
            return pixel;
        });
    }
}

function splitLines(colors, length) {
    var str = '';

    for (var i = 0; i < colors.length; i++) {
        if (i > 0 && i % length === 0) {
            str += '\n';
        }
        str += colors[i].char;
    }

    return str;
}

function factory(options) {
    var renderer = new HTMLRenderer(options);

    return function (data) {
        return renderer.render(data);
    };
}

factory.CHARSET = Renderer.CHARSET;
factory.Class = HTMLRenderer;

module.exports = factory;