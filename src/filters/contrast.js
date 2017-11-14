import { linearTransformation } from "./linear";

export default function factory(val) {
    return image => contrast(image, val);
}

export function contrast(image, val = 1) {
    return linearTransformation(image, val, 0);
}
