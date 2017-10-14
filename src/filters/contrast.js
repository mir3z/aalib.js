import linear from "./linear";

export default function factory(val) {
    return function (image) {
        return contrast(image, val);
    };
}

export function contrast(image, val) {
    return linear(val || 1, 0)(image);
}
