module.exports = function (w) {

  return {
    files: [
      'src/utils/**/*.ts',
      '!src/utils/**/*.spec.ts'
    ],

    tests: [
      'src/utils/**/*.spec.ts'
    ],

    env: {
      type: 'node'
    },

    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'jasmine'
  };
};
