export default function factory() {
    return function (image) {
        return inverse(image);
    };
}

export function inverse(image) {
    return image.filter((color) => color.inverse().clamp());
}
