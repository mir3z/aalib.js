import AbstractReporter from "./AbstractReporter";

export default class RemoteReported extends AbstractReporter {
    constructor(endpoint) {
        super();
        this.endpoint = endpoint;
    }

    post(body) {
        return window.fetch(this.endpoint, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(body)
        });
    }

    benchmarkComplete(event) {
        this.post({ message: String(event.target) });
    }
}



