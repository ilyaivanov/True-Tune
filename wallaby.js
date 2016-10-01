"use strict";

let wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

    let webpackPostprocessor = wallabyWebpack({
        // webpack options
        module: {
            loaders: [{
                test: /\.json$/,
                loader: 'json-loader'
            }]
        },
        externals: {
            jsdom: 'window',
            cheerio: 'window',
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': 'window',
            "react": "React",
            'react/addons': true
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    });

    return {
        files: [
            {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
            {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
            {pattern: '!src/**/*.spec.js*', load: false},
            {pattern: 'src/**/*.js*', load: false}
        ],

        tests: [
            {pattern: 'src/**/*.spec.js*', load: false}
        ],

        compilers: {
            '**/*.js*': wallaby.compilers.babel({presets: ['react', 'es2015']})
        },

        postprocessor: webpackPostprocessor,

        setup: function () {
            window.__moduleBundler.loadTests();
        },
        env: {
            kind: 'electron'
        },
        filesWithNoCoverageCalculated: ['src/index.js', 'src/webpack-public-path.js'],

        testFramework: "jasmine"
    };
};