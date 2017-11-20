import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

export default class AbstractReader {
    read() {
        return Observable.create(observer => {
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