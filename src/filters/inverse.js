export default function factory() {
    return image => inverse(image);
}

export function inverse(image) {
    return image.process((color, processor) => {
        processor.inverse(color).clamp(color);
    });
}
