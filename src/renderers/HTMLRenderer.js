import Renderer from "../../src/renderers/Renderer";

class HTMLRenderer extends Renderer {

    constructor(options) {
        super(Object.assign({}, {
            tagName: "pre"
        }, options));

        this.el = this.options.el || document.createElement(this.options.tagName);
        this.el.style.fontFamily = this.options.fontFamily;
    }

    render(image) {
        super.render(image);

        if (image.colorful) {
            this.colorize(image.data);
        }

        const content = splitLines(image.data, image.width);

        if (image.colorful) {
            this.el.innerHTML = content;
        } else {
            this.el.textContent = content;
        }

        return this.el;
    }

    colorize(pixels) {
        return pixels.map(pixel => {
            pixel.char = `<span style="color: rgb(${ pixel.r }, ${ pixel.g }, ${ pixel.b })">${ pixel.char }</span>`;
            return pixel;
        });
    }
}

function splitLines(colors, length) {
    let str = "";

    for (let i = 0; i < colors.length; i++) {
        if (i > 0 && i % length === 0) {
            str += "\n";
        }
        str += colors[i].char;
    }

    return str;
}

export default function factory(options) {
    const renderer = new HTMLRenderer(options);

    return data => renderer.render(data);
}

factory.CHARSET = Renderer.CHARSET;
factory.Class = HTMLRenderer;
