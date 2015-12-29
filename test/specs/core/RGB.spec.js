var RGB = require('core/RGB');

describe('RGB object', () => {

    it('should set default values', () => {
        var rgb = new RGB();

        expect(rgb).toMatchRGB(0, 0, 0);
    });

    it('should set provided values', () => {
        var rgb = new RGB(10, 20, 40);

        expect(rgb).toMatchRGB(10, 20, 40);
    });

    it('should multiply by value', () => {
        var rgb = new RGB(10, 20, 40);

        rgb.mul(10);

        expect(rgb).toMatchRGB(100, 200, 400);
    });

    it('should add value', () => {
        var rgb = new RGB(100, 200, 0);

        rgb.add(100);

        expect(rgb).toMatchRGB(200, 300, 100);
    });

    it('should add color', () => {
        var rgb = new RGB(100, 200, 0);

        rgb.addc(new RGB(100, 50, 10));

        expect(rgb).toMatchRGB(200, 250, 10);
    });

    it('should divide by value', () => {
        var rgb = new RGB(100, 200, 0);

        rgb.div(10);

        expect(rgb).toMatchRGB(10, 20, 0);
    });

    it('should invert color', () => {
        var rgb = new RGB(0, 200, 255);

        rgb.inverse();

        expect(rgb).toMatchRGB(255, 55, 0);
    });

    it('should calculate grayscale value', () => {
        var rgb = new RGB(0, 200, 100);

        var gray = rgb.getGrayscale();

        expect(gray).toBe(100);
    });

    it('should clamp color components', () => {
        var rgb = new RGB(-100, 255, 500);

        rgb.clamp();

        expect(rgb).toMatchRGB(0, 255, 255);
    });

});
