export default class RGB {

    constructor(r, g, b) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
    }

    mul(v) {
        this.r = ~~(this.r * v);
        this.g = ~~(this.g * v);
        this.b = ~~(this.b * v);

        return this;
    }

    add(v) {
        this.r += v;
        this.g += v;
        this.b += v;

        return this;
    }

    addc(c) {
        this.r += c.r;
        this.g += c.g;
        this.b += c.b;

        return this;
    }

    div(v) {
        return this.mul(1.0 / v);
    }

    inverse() {
        this.r = 255 - this.r;
        this.g = 255 - this.g;
        this.b = 255 - this.b;

        return this;
    }

    getGrayscale() {
        return Math.floor((this.r + this.g + this.b) / 3);
    }

    clamp() {
        this.r = clampVal(this.r);
        this.g = clampVal(this.g);
        this.b = clampVal(this.b);

        return this;
    }
}

function clampVal(v) {
    return Math.min(Math.max(v, 0), 255);
}
