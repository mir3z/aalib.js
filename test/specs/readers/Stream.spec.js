import { spy } from "sinon";
import { expect } from "chai";

import Stream from "../../../src/readers/Stream";

describe("readers/Stream", () => {
    it("sets initial state", () => {
        const stream = new Stream();
        expect(stream.ready).to.be.false;
        expect(stream.sink.length).to.eql(0);
        expect(stream.data).to.eql(null);
    });

    it("does not start processing until end method is called", () => {
        const handler = spy();
        const stream = new Stream();

        stream.write("something").pipe(handler);

        expect(handler.called).not.to.be.ok;
    });

    it("does not process data when there is no data written", () => {
        const handler = spy();
        const stream = new Stream();

        stream.pipe(handler).end();

        expect(handler.called).not.to.be.ok;
    });

    it("starts processing after end method is called", () => {
        const handler = spy();
        const stream = new Stream();
        const data = "this is data";

        stream.write(data).pipe(handler).end();

        expect(handler.calledWith(data)).to.be.ok;
    });

    it("process data when it is written after end method was called", () => {
        const handler = spy();
        const stream = new Stream();
        const data = 100;
        stream.pipe(handler).end();

        stream.write(data);

        expect(handler.calledWith(data)).to.be.ok;
    });

    it("allows to add handlers", () => {
        const handler1 = spy();
        const handler2 = spy();
        const stream = new Stream();

        stream
            .write({ foo: 10 })
            .pipe(handler1)
            .pipe(handler2)
            .end();

        expect(handler1.called).to.be.ok;
        expect(handler2.called).to.be.ok;
    });

    it("allows to transform data", () => {
        const stream = new Stream();

        stream
            .write({ foo: 10 })
            .pipe((o) => { o.foo *= 2; return o; })
            .pipe((o) => { o.foo += 5; return o; })
            .end();

        expect(stream.data.foo).to.eql(25);
    });

    it("handles continuous data flow", () => {
        const handler = spy();
        const stream = new Stream();
        const writeCount = 3;

        stream.pipe(handler).end();

        for (let i = 0; i < writeCount; i++) {
            stream.write(i);
        }

        expect(handler.getCalls()).to.have.lengthOf(writeCount);
    });
});
