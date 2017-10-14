import { mapRange } from "./utils";

export default function aafont(charset, options) {
    let table = [];
    let min = 255;
    let max = 0;

    charset.forEach(char => {
        const brightness = calculateBrightness(char, options);

        if (brightness < min) {
            min = brightness;
        }
        if (brightness > max) {
            max = brightness;
        }

        table.push([char, brightness]);
    });

    table = table.map(entry => {
        return [entry[0], Math.floor(mapRange(entry[1], min, max, 0, 255))];
    });

    table = table.sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
    });

    return table;
}

function calculateBrightness(char, options) {
    const canvas = drawChar(char, options);
    const ctx = canvas.getContext("2d");
    let brightness = 0;
    let r, g, b;

    const idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < idata.data.length; i += 4) {
        r = idata.data[i];
        g = idata.data[i+1];
        b = idata.data[i+2];

        brightness += (r + g + b) / 3;
    }

    brightness /= canvas.width * canvas.height;

    return brightness;
}

function drawChar(char, options) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });
    const font = options && options.fontFamily || "monospace";

    canvas.width = 15;
    canvas.height = 25;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "20px " + font;

    ctx.fillText(char, 0, 0);

    return canvas;
}

