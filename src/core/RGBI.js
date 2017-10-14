import RGB from "./RGB";

export default class RGBI extends RGB {

    constructor(r, g, b, i) {
        super(r, g, b);
        this.intensity = i || 0;
    }

    mul(v) {
        this.intensity = ~~(this.intensity * v);

        return this;
    }

    add(v) {
        this.intensity += v;

        return this;
    }

    div(v) {
        return this.mul(1.0 / v);
    }

    inverse() {
        this.intensity = 255 - this.intensity;

        return this;
    }

    clamp() {
        this.intensity = Math.min(Math.max(this.intensity, 0), 255);

        return this;
    }
}
