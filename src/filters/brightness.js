var linear = require('./linear');

function brightness(image, val) {
    return linear(1, val || 0)(image);
}

function factory(val) {
    return function (image) {
        return brightness(image, val);
    };
}

module.exports = factory;