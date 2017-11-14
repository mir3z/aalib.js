import { clampByte } from "../utils";

export default {
    mul(color, v) {
        color.r = ~~(color.r * v);
        color.g = ~~(color.g * v);
        color.b = ~~(color.b * v);

        return this;
    },

    add(color, v) {
        color.r += v;
        color.g += v;
        color.b += v;

        return this;
    },

    addc(color, { r, g, b }) {
        color.r += r;
        color.g += g;
        color.b += b;

        return this;
    },

    div(color, v) {
        return this.mul(color, 1.0 / v);
    },

    inverse(color) {
        color.r = 255 - color.r;
        color.g = 255 - color.g;
        color.b = 255 - color.b;

        return this;
    },

    getGrayscale(color) {
        return ~~((color.r + color.g + color.b) / 3);
    },

    clamp(color) {
        color.r = clampByte(color.r);
        color.g = clampByte(color.g);
        color.b = clampByte(color.b);

        return this;
    }
};
