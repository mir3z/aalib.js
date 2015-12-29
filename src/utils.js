module.exports = {
    mapRange(x, inStart, inEnd, outStart, outEnd) {
        return outStart + ((outEnd - outStart) / (inEnd - inStart)) * (x - inStart);
    },

    getRGB(idata, x, y) {
        var offset = y * (idata.width << 2) + (x << 2);

        return {
            r: idata.data[offset],
            g: idata.data[offset + 1],
            b: idata.data[offset + 2]
        };
    },

    trunc(val) {
        if (val > 255) {
            return 255;
        } else if (val < 0) {
            return 0;
        } else {
            return val;
        }
    }
};