import Rx from "rxjs";

export default class AbstractReader {
    read() {
        return Rx.Observable.create(observer => {
            this.onRead(observer);
            return this.onDispose;
        });
    }

    onRead() {
        // override
    }

    onDispose() {
        // override
    }
}