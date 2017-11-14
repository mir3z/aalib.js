export function mapRange(x, inStart, inEnd, outStart, outEnd) {
    return outStart + ((outEnd - outStart) / (inEnd - inStart)) * (x - inStart);
}

export function getRGB(idata, x, y) {
    const offset = y * (idata.width << 2) + (x << 2);

    return {
        r: idata.data[offset],
        g: idata.data[offset + 1],
        b: idata.data[offset + 2]
    };
}

export function trunc(val) {
    if (val > 255) {
        return 255;
    } else if (val < 0) {
        return 0;
    } else {
        return val;
    }
}

export function range(start, end) {
    return Array.from(new Array(end - start + 1).keys()).map(i => i + start);
}
export function clampByte(v) {
    if (v > 255) {
        return 255;
    } else if (v < 0) {
        return 0;
    }
    return v;
}