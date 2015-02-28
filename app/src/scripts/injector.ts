'use strict';
import i_angular = require('angular');

/**
 * Injector is the class that injects libraries for the browser only.
 * This will be stubbed when do tests.
 */
class Injector {
  static angular(): typeof i_angular {
    var angular = require('angular');
    require('angular-route');
    require('cw-modal');
    return angular;
  }

  static d3(): D3.Base {
    return require('d3');
  }

  static document(): Document {
    return document;
  }

  static egridCore(): typeof egrid {
    return require('egrid-core');
  }

  static FileReader(): typeof FileReader {
    return FileReader;
  }

  static semjs(): typeof sem {
    return require('semjs');
  }
}

export = Injector;