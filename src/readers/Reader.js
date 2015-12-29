var Stream = require('./Stream');

class Reader {
    constructor() {
        this.stream = new Stream();
    }

    onRead(stream, error) {
        void stream; void error;
    }

    read() {
        this.onRead(
            this.stream.write.bind(this.stream),
            this.error.bind(this)
        );

        return this.stream;
    }

    error(msg) {
        this.stream.clear();
        throw msg;
    }
}

module.exports = Reader;