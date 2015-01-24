exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  specs: [
    'test/e2e/es5/fast/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://127.0.0.1:8080',
  rootElement: 'body',

  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 11000,

  onPrepare: function() {
    // At this point, global 'protractor' object will be set up, and
    // jasmine will be available.
  },

  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    onComplete: function() {},
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000
  }
};