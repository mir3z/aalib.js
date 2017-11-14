export default function createTestRunner(createController, reporter) {
    const benchmarks = [];
    let idx = 0;

    function runNext() {
        if (idx > benchmarks.length - 1) {
            return;
        }

        const controller = createController({
            onSuiteStart: event => reporter.suiteStart(event),
            onSuiteCycle: event => reporter.suiteCycle(event),
            onSuiteComplete: event => {
                reporter.suiteComplete(event);
                runNext();
            },
            onBenchmarkStart: event => reporter.benchmarkStart(event),
            onBenchmarkComplete: event => reporter.benchmarkComplete(event)
        });

        benchmarks[idx++](controller);
    }

    return {
        register(benchmark) {
            benchmarks.push(benchmark);
        },

        run() {
            idx = 0;
            runNext();
        }
    };
}