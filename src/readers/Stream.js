export default class Stream {

    constructor() {
        this.clear();
    }

    write(data) {
        this.initialData = data;

        if (this.ready && this.sink.length) {
            this.run();
        }

        return this;
    }

    run() {
        this.data = this.initialData;

        this.sink.forEach((fn) => {
            this.data = fn(this.data);
        });

        return this;
    }

    end() {
        this.ready = true;

        if (this.initialData) {
            this.run();
        }

        return this;
    }

    pipe(fn) {
        this.sink.push(fn);

        return this;
    }

    clear() {
        this.sink = [];
        this.data = null;
        this.initialData = null;
        this.ready = false;

        return this;
    }
}