import linear from "./linear";

export default function factory(val) {
    return function (image) {
        return brightness(image, val);
    };
}

export function brightness(image, val) {
    return linear(1, val || 0)(image);
}
