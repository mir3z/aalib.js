export default function factory() {
    return image => desaturate(image);
}

export function desaturate(image) {
    return image.process((color, processor) => {
        processor.desaturate(color);
    });
}
