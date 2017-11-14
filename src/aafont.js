import { mapRange } from "./utils";

export default function aafont(charset, options) {
    const table = new Array(charset.length);
    let min = 255;
    let max = 0;

    for (let i = 0; i < charset.length; i++) {
        const char = charset[i];
        const brightness = calculateBrightness(char, options);

        if (brightness < min) {
            min = brightness;
        }
        if (brightness > max) {
            max = brightness;
        }

        table[i] = { char, brightness };
    }

    return table
        .map(({ char, brightness }) => ({ char, brightness: ~~mapRange(brightness, min, max, 0, 255) }))
        .sort((a, b) => {
            if (a.brightness < b.brightness) return -1;
            if (a.brightness > b.brightness) return 1;
            return 0;
        });
}

function calculateBrightness(char, options) {
    const canvas = drawChar(char, options);
    const ctx = canvas.getContext("2d");
    const idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data32 = new Uint32Array(idata.data.buffer);

    let brightness = 0;
    let i = data32.length;
    let r, g, b, pixel32;

    while (i--) {
        pixel32 = data32[i];

        r = pixel32 & 0xff;
        g = (pixel32 >> 8) & 0xff;
        b = (pixel32 >> 16) & 0xff;

        brightness += (r + g + b) / 3;
    }

    brightness /= canvas.width * canvas.height;

    return brightness;
}

function drawChar(char, { fontFamily = "monospace" } = {}) {
    const { canvas, ctx } = createCanvas();

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "20px " + fontFamily;

    ctx.fillText(char, 0, 0);

    return canvas;
}

const createCanvas = once(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });

    canvas.width = 15;
    canvas.height = 25;

    return { canvas, ctx };
});

function once(func) {
    func._result = null;
    return () => func._result || (func._result = func());
}