import { spy, stub } from "sinon";
import { expect } from "chai";

import Reader from "../../../src/readers/Reader";
import Stream from "../../../src/readers/Stream";

describe("readers/Reader", () => {
    it("calls onRead when read is called", () => {
        const reader = new Reader();
        spy(reader, "onRead");

        reader.read();

        expect(reader.onRead.called).to.be.ok;
    });

    it("returns stream when read is called", () => {
        const reader = new Reader();
        expect(reader.read()).to.be.an.instanceOf(Stream);
    });

    it("passes stream writer to onRender", () => {
        const reader = new Reader();
        stub(reader, "onRead").callsFake(write => write("test write"));
        spy(reader.stream, "write");

        reader.read();

        expect(reader.stream.write.calledWith("test write")).to.be.ok;
    });

    it("passes error handler to onRead", () => {
        const reader = new Reader();
        stub(reader, "onRead").callsFake((write, error) => error("error occurred"));
        stub(reader, "error");

        reader.read();

        expect(reader.error.calledWith("error occurred")).to.be.ok;
    });

    describe("when read error occurred", () => {
        it("clears stream", () => {
            const reader = new Reader();
            spy(reader.stream, "clear");

            try {
                reader.error("any");
            } catch (e) {
                // ignore
            }

            expect(reader.stream.clear.called).to.be.ok;
        });

        it("logs error message", () => {
            const reader = new Reader();
            expect(() => reader.error("any")).to.throw("any");
        });
    });

});