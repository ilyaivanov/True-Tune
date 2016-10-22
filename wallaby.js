"use strict";

let wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

    let webpackPostprocessor = wallabyWebpack({
        // webpack options
        module: {
            loaders: [
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /(\.css|\.scss)$/,
                    loaders: ['raw-loader', 'style', 'css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap']
                }
            ]
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
            extensions: ['', '.js', '.jsx', '.scss']
        }
    });

    return {
        files: [
            {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
            {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
            {pattern: 'node_modules/font-awesome/css/font-awesome.css', instrument: false},
            {pattern: 'src/**/*.spec.js*', ignore:true},
            {pattern: 'src/**/*.js*', load: false},
            {pattern: ('src/**/*.scss'), load: false},
        ],

        tests: [
            {pattern: 'src/**/*.spec.js*', load: false}
        ],

        compilers: {
            '**/*.js*': wallaby.compilers.babel({"presets": ["latest", "react", "stage-0"]})
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
