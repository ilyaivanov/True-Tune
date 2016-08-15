var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

    var webpackPostprocessor = wallabyWebpack({
        // webpack options

        externals: {
            // Use external version of React instead of rebuilding it
            "react": "React",
            jsdom: 'window',
            cheerio: 'window',
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': 'window'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    });

    return {
        files: [
            // not required if using PhantomJs2 - http://wallabyjs.com/docs/integration/phantomjs2.html
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
            {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
            {pattern: 'node_modules/sinon/lib/sinon.js', instrument: false},

            {pattern: 'src/**/*.js*', load: false},
            {pattern: '!src/**/*spec.js*', load: false}
        ],

        tests: [
            {pattern: 'src/**/*spec.js*', load: false}
        ],

        compilers: {
            '**/*.js*': wallaby.compilers.babel({
                'babelrc': false,
                'presets': [
                    'es2015',
                    'react',
                    'stage-1'
                ],
            })
        },

        postprocessor: webpackPostprocessor,

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
