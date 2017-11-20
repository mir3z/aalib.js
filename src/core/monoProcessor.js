import { clampByte } from "../utils";

export default {
    mul(color, v) {
        color.mono = ~~(color.mono * v);
        return this;
    },

    add(color, v) {
        color.mono += v;
        return this;
    },

    div(color, v) {
        this.mul(color, 1.0 / v);
    },

    inverse(color) {
        color.mono = 255 - color.mono;
        return this;
    },

    desaturate(color) {
        color.r = color.g = color.b = color.mono;
        return color;
    },

    clamp(color) {
        color.mono = clampByte(color.mono);
        return this;
    }
};