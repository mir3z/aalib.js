/* eslint no-console: ["error", { allow: ["log"] }] */

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = 8090;
const HOSTNAME = "127.0.0.1";
const REPORTER_PATH = "/__reporter__";

const config = {
    entry: path.join(__dirname, "../index.js"),
    output: {
        filename: "test-harness.js"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
        noParse: [/benchmark\.js/]
    },
    plugins: [
        new Webpack.DefinePlugin({
            __ENV__: {
                remoteReporterPath: JSON.stringify(REPORTER_PATH)
            }
        })
    ]
};

const compiler = Webpack(config);
const server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, "../www"),
    publicPath: "/",
    quiet: true,
    before: createReportingMiddleware(REPORTER_PATH)
});

function createReportingMiddleware(reporterPath) {
    return app => {
        app.use(bodyParser.json());

        app.post(reporterPath, (req, res) => {
            const { message } = req.body;
            console.log(">> " + message);
            res.status(200).end();
        });
    };
}

server.listen(PORT, HOSTNAME, () => {
    console.log(`Starting server on http://${ HOSTNAME }:${ PORT }`);
});