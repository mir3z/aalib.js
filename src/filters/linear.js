export default function factory(alpha, beta) {
    return image => linearTransformation(image, alpha, beta);
}

export function linearTransformation(image, alpha, beta) {
    return image.process((color, processor) => {
        processor.mul(color, alpha).add(color, beta).clamp(color);
    });
}
