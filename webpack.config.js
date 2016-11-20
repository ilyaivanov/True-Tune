//
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".scss"]
    },

    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"},
            {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']},
        ]
    },
    postcss: () => [autoprefixer]
};