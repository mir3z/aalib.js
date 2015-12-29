
var matchers = {

    toMatchRGB: () => {
        return {
            compare(actual, expR, expG, expB) {
                var result = {};

                function toStr_3(r, g, b) {
                    return `RGB(${r}, ${g}, ${b})`;
                }

                function toStr_1(rgb) {
                    return toStr_3(rgb.r, rgb.g, rgb.b);
                }

                result.pass =
                    actual.r === expR &&
                    actual.g === expG &&
                    actual.b === expB;

                if (result.pass) {
                    result.message = `Expected ${ toStr_1(actual) } NOT to be ${ toStr_3(expR, expG, expB) }`;
                } else {
                    result.message = `Expected ${ toStr_1(actual) } to be ${ toStr_3(expR, expG, expB) }`;
                }

                return result;
            }
        };
    },

    toMatchRGBI: () => {
        return {
            compare(actual, expR, expG, expB, expI) {
                var result = {};

                function toStr_4(r, g, b, i) {
                    return `RGB(${r}, ${g}, ${b}, ${i})`;
                }

                function toStr_1(rgbi) {
                    return toStr_4(rgbi.r, rgbi.g, rgbi.b, rgbi.intensity);
                }

                result.pass =
                    actual.r === expR &&
                    actual.g === expG &&
                    actual.b === expB &&
                    actual.intensity === expI;

                if (result.pass) {
                    result.message = `Expected ${ toStr_1(actual) } NOT to be ${ toStr_4(expR, expG, expB, expI) }`;
                } else {
                    result.message = `Expected ${ toStr_1(actual) } to be ${ toStr_4(expR, expG, expB, expI) }`;
                }

                return result;
            }
        };
    }

};

beforeEach(() => {
    jasmine.addMatchers(matchers);
});

module.exports = matchers;