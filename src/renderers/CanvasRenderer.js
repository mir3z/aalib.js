var defaults = require('lodash/object/defaults');
var Renderer = require('./Renderer');

class CanvasRenderer extends Renderer {

    constructor(options) {
        super(defaults(options || {}, {
            fontSize: 7,
            lineHeight: 7,
            width: 400,
            height: 300
        }));

        this.el = this.options.el || document.createElement('canvas');
        this.el.width = this.options.width;
        this.el.height = this.options.height;

        this.ctx = this.el.getContext('2d');
        this.ctx.fillStyle = '#000';
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'start';
        this.ctx.font = this.options.fontSize + 'px ' + this.options.fontFamily;
    }

    render(image) {
        super.render(image);

        if (image.colorful) {
            this.renderColorful(image);
        } else {
            this.renderMonochrome(image);
        }

        return this.el;
    }

    renderColorful(image) {
        var lineHeight = this.options.lineHeight;
        var x, y, color;
        this.clearCanvas();

        for (var i = 0; i < image.data.length; i++) {
            x = i % image.width;
            y = ~~(i / image.width);
            color = image.data[i];

            this.ctx.fillStyle = `rgb(${ color.r }, ${ color.g }, ${ color.b })`;
            this.ctx.fillText(image.data[i].char, x * 4.2, y * lineHeight);
        }
    }

    renderMonochrome(image) {
        var lineHeight = this.options.lineHeight;
        var y, line;
        this.clearCanvas();

        for (var i = 0; i < image.data.length; i += image.width) {
            y = ~~(i / image.width);
            line = image.data
                .slice(i, i + image.width)
                .map((data) => data.char)
                .join('');
            this.ctx.fillText(line, 0, y * lineHeight);
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    }
}

function factory(options) {
    var renderer = new CanvasRenderer(options);

    return function (data) {
        return renderer.render(data);
    };
}

factory.CHARSET = Renderer.CHARSET;
factory.Class = CanvasRenderer;

module.exports = factory;