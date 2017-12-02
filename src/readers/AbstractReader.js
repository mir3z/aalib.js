import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

export default class AbstractReader {
    read() {
        return Observable.create(observer => {
            this.onRead(observer);
            return this.onDispose.bind(this);
        });
    }

    onRead() {
        // override
    }

    onDispose() {
        // override
    }
}