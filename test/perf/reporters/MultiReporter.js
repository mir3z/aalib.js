import AbstractReporter from "./AbstractReporter";

export default class MultiReporter extends AbstractReporter {
    constructor(...reporters) {
        super();

        const propagator = (method) => (event) => reporters.forEach(reporter => reporter[method](event));

        const self = this;
        const methods = Object
            .getOwnPropertyNames(AbstractReporter.prototype)
            .filter(name => name !== "constructor");

        methods.forEach(method => self[method] = propagator(method));
    }
}



