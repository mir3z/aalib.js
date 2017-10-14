import RGB from "./core/RGB";
import RGBI from "./core/RGBI";
import Image from "./core/Image";
import { mapRange } from "./utils";

let color = {};

export default function factory(options) {
    return function (image) {
        return aa(image, options);
    };
}

function aa(image, options) {
    const { width, height, colorful } = options;

    const bw = image.width / width;
    const bh = image.height / height;

    let imin = 255;
    let imax = 0;

    const aaImage = new Image(width, height);

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {

            color = analyzeBlock(
                image,
                ~~(j * bw),
                ~~(i * bh),
                bw,
                bh
            );

            if (color.intensity > imax) {
                imax = color.intensity;
            }
            if (color.intensity < imin) {
                imin = color.intensity;
            }

            aaImage.data.push(color);
        }
    }

    normalizeIntensity(aaImage, imin, imax);

    aaImage.colorful = colorful;

    return aaImage;
}

function analyzeBlock(image, x, y, width, height) {
    const avgColor = new RGB();
    let count = 0;
    let color;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            color = image.getAt(x + col, y + row);
            avgColor.addc(color);
            count++;
        }
    }

    avgColor.div(count);

    return new RGBI(
        avgColor.r,
        avgColor.g,
        avgColor.b,
        avgColor.getGrayscale()
    );
}

function normalizeIntensity(img, a, b) {
    img.filter((color) => {
        color.intensity = ~~mapRange(color.intensity, a, b, 0, 255);
    });
}