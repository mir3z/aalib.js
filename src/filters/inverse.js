function inverse(image) {
    return image.filter((color) => color.inverse().clamp());
}

function factory() {
    return function (image) {
        return inverse(image);
    };
}

module.exports = factory;