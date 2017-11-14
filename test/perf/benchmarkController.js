import b from "benchmark";
import _ from "lodash";
import process from "process";

const Benchmark = b.runInContext({ _, process });
window.Benchmark = Benchmark;

export default function createBenchmarkController(props) {
    const { onSuiteStart, onSuiteCycle, onSuiteComplete, onBenchmarkStart, onBenchmarkComplete } = props;
    const suite = new Benchmark.Suite();

    onSuiteStart && suite.on("start", onSuiteStart);
    onSuiteCycle && suite.on("cycle", onSuiteCycle);
    onSuiteComplete && suite.on("complete", onSuiteComplete);

    const test = (name, fn) => suite.add(name, fn, {
        onStart: onBenchmarkStart,
        onComplete: onBenchmarkComplete
    });
    const run = () => suite.run({ async: true });

    return { test, run };
}