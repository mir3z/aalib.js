var RGBI = require('core/RGBI');

describe('RGBI object', () => {

    it('should set default values', () => {
        var rgbi = new RGBI();

        expect(rgbi).toMatchRGBI(0, 0, 0, 0);
    });

    it('should set provided values', () => {
        var rgbi = new RGBI(10, 20, 40, 50);

        expect(rgbi).toMatchRGBI(10, 20, 40, 50);
    });

    it('should multiply by value', () => {
        var rgbi = new RGBI(10, 20, 40, 50);

        rgbi.mul(2);

        expect(rgbi).toMatchRGBI(10, 20, 40, 100);
    });

    it('should add value', () => {
        var rgbi = new RGBI(100, 200, 0, 100);

        rgbi.add(100);

        expect(rgbi).toMatchRGBI(100, 200, 0, 200);
    });

    it('should divide by value', () => {
        var rgbi = new RGBI(100, 200, 0, 200);

        rgbi.div(10);

        expect(rgbi).toMatchRGBI(100, 200, 0, 20);
    });

    it('should invert intensity', () => {
        var rgbi = new RGBI(0, 200, 255, 100);

        rgbi.inverse();

        expect(rgbi).toMatchRGBI(0, 200, 255, 155);
    });

    it('should clamp intensity', () => {
        var rgbi = new RGBI(-100, 255, 100, 500);

        rgbi.clamp();

        expect(rgbi).toMatchRGBI(-100, 255, 100, 255);
    });

});
