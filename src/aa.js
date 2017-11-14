import AAImage from "./core/AAImage";
import monoProcessor from "./core/monoProcessor";
import rgbProcessor from "./core/rgbProcessor";
import { mapRange } from "./utils";

export default function factory(options) {
    return (image) => aa(image, options);
}

export function aa(image, options) {
    const { width, height, colored = false } = options;

    const bw = image.width / width;
    const bh = image.height / height;

    let minMono = 255;
    let maxMono = 0;

    const data = new Array(width * height);
    let k = 0;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {

            const color = analyzeColors(
                image,
                ~~(j * bw),
                ~~(i * bh),
                bw,
                bh
            );

            if (color.mono > maxMono) {
                maxMono = color.mono;
            }
            if (color.mono < minMono) {
                minMono = color.mono;
            }

            data[k++] = color;
        }
    }

    const aaImage = new AAImage({
        width,
        height,
        data,
        colorProcessor: monoProcessor,
        meta: { colored }
    });
    
    normalizeGrayscale(aaImage, minMono, maxMono);

    return aaImage;
}

function analyzeColors(image, x, y, width, height) {
    const avgColor = { r: 0, g: 0, b: 0 };
    let count = 0;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            rgbProcessor.addc(avgColor, image.getAt(x + col, y + row));
            count++;
        }
    }

    rgbProcessor.div(avgColor, count);

    return {
        r: avgColor.r,
        g: avgColor.g,
        b: avgColor.b,
        mono: rgbProcessor.getGrayscale(avgColor)
    };
}

function normalizeGrayscale(img, a, b) {
    img.process((color) => {
        color.mono = ~~mapRange(color.mono, a, b, 0, 255);
    });
}