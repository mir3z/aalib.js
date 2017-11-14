/* global __ENV__ */

import createTestRunner from "./testRunner";
import createBenchmarkController from "./benchmarkController";
import ConsoleReporter from "./reporters/ConsoleReporter";
import RemoteReporter from "./reporters/RemoteReporter";
import HtmlReporter from "./reporters/HtmlReporter";
import MultiReporter from "./reporters/MultiReporter";

import runAAFontBenchmark from "./benchmarks/aafont";
import runAAImageBenchmark from "./benchmarks/aaimage";
import runAABenchmark from "./benchmarks/aa";
import runHtmlRendererBenchmark from "./benchmarks/htmlRenderer";
import runCanvasRendererBenchmark from "./benchmarks/canvasRenderer";

const htmlReporter = new HtmlReporter(document.querySelector("#html-reporter"));
const consoleReporter = new ConsoleReporter();
const remoteReporter = new RemoteReporter(__ENV__.remoteReporterPath);
const multiReporter = new MultiReporter(remoteReporter, consoleReporter, htmlReporter);

const runner = createTestRunner(createBenchmarkController, multiReporter);

runner.register(runAAFontBenchmark);
runner.register(runAAImageBenchmark);
runner.register(runAABenchmark);
runner.register(runHtmlRendererBenchmark);
runner.register(runCanvasRendererBenchmark);

runner.run();
