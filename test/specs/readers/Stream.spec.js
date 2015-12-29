var Stream = require('readers/Stream');

describe('Stream', () => {
    var stream;

    beforeEach(() => {
        stream = new Stream();
    });

    it('should set initial state', () => {
        expect(stream.ready).toBeFalsy();
        expect(stream.sink.length).toBe(0);
        expect(stream.data).toBeNull();
    });

    it('should not start processing until end method is called', () => {
        var handler = jasmine.createSpy();

        stream.write('something').pipe(handler);

        expect(handler).not.toHaveBeenCalled();
    });

    it('should not process data when there is no data written', () => {
        var handler = jasmine.createSpy();

        stream.pipe(handler).end();

        expect(handler).not.toHaveBeenCalled();
    });

    it('should start processing after end method is called', () => {
        var handler = jasmine.createSpy();
        var data = 'this is data';

        stream.write(data).pipe(handler).end();

        expect(handler).toHaveBeenCalledWith(data);
    });

    it('should process data when it is written after end method was called', () => {
        var handler = jasmine.createSpy();
        var data = 100;
        stream.pipe(handler).end();

        stream.write(data);

        expect(handler).toHaveBeenCalledWith(data);
    });

    it('should allow to add handlers', () => {
        var handler1 = jasmine.createSpy(),
            handler2 = jasmine.createSpy();

        stream
            .write({ foo: 10 })
            .pipe(handler1)
            .pipe(handler2)
            .end();

        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
    });

    it('should allow to transform data', () => {
        stream
            .write({ foo: 10 })
            .pipe((o) => { o.foo *= 2; return o; })
            .pipe((o) => { o.foo += 5; return o; })
            .end();

        expect(stream.data.foo).toBe(25);
    });

    it('should handle continuous data flow', () => {
        var handler = jasmine.createSpy();
        stream.pipe(handler).end();

        for (var i = 0; i < 3; i++) {
            stream.write(i);
        }

        expect(handler.calls.count()).toBe(3);
    });
});
