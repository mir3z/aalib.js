var linear = require('./linear');

function contrast(image, val) {
    return linear(val || 1, 0)(image);
}

function factory(val) {
    return function (image) {
        return contrast(image, val);
    };
}

module.exports = factory;