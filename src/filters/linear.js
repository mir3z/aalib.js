export default function factory(alfa, beta) {
    return function (img) {
        return linearTransform(img, alfa, beta);
    };
}

export function linearTransform(image, alfa, beta) {
    return image.filter((color) => {
        return color.mul(alfa).add(beta).clamp();
    });
}
