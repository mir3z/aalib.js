/* eslint no-console: ["error", { allow: ["info"] }] */

import AbstractReporter from "./AbstractReporter";

export default class ConsoleReporter extends AbstractReporter {
    benchmarkComplete(event) {
        console.info(String(event.target));
    }
}