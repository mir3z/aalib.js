var aafont = require('aafont');

describe('aafont', () => {
    it('should calculate and normalize given characters brightness', () => {
        var charset = ['.', '*', '#'];

        var fontTable = aafont(charset);

        expect(fontTable).toEqual(jasmine.any(Array));
        expect(fontTable[0][0]).toBe('#');
        expect(fontTable[0][1]).toBe(0);
        expect(fontTable[1][0]).toBe('*');
        expect(fontTable[1][1] < 180 && fontTable[1][1] > 150).toBeTruthy();
        expect(fontTable[2][0]).toBe('.');
        expect(fontTable[2][1]).toBe(255);
    });
});