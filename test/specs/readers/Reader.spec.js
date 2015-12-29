var Reader = require('readers/Reader');
var Stream = require('readers/Stream');

describe('Reader', () => {
    var reader;

    beforeEach(() => {
        reader = new Reader();
    });

    it('should call onRead when read is called', () => {
        spyOn(reader, 'onRead');

        reader.read();

        expect(reader.onRead).toHaveBeenCalled();
    });

    it('should return stream when read is called', () => {
        expect(reader.read()).toEqual(jasmine.any(Stream));
    });

    it('should pass stream writer to onRender', () => {
        spyOn(reader, 'onRead').and.callFake((write) => {
            write('test write');
        });
        spyOn(reader.stream, 'write');

        reader.read();

        expect(reader.stream.write).toHaveBeenCalledWith('test write');
    });

    it('should pass error handler to onRender', () => {
        spyOn(reader, 'onRead').and.callFake((write, error) => {
            error('error occurred');
        });
        spyOn(reader, 'error');

        reader.read();

        expect(reader.error).toHaveBeenCalledWith('error occurred');
    });

    describe('when read error occurred', () => {
        it('should clear stream when error occurred', () => {
            spyOn(reader.stream, 'clear');

            try {
                reader.error('any');
            } catch (e) {
                // ignore
            }

            expect(reader.stream.clear).toHaveBeenCalled();
        });

        it('should log error message', () => {
            expect(() => {
                reader.error('any');
            }).toThrow('any');
        });
    });

});