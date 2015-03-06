'use strict';
import i_angular = require('angular');
import cwlog = require('cw-log');

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

  static egrid(): typeof egrid {
    // Should be wrapped in the property of core.
    return {core: require('egrid-core')};
  }

  static FileReader(): typeof FileReader {
    return FileReader;
  }

  static log(): cwlog.Log {
    return require('cw-log').logger(6);
  }

  static semjs(): typeof sem {
    return require('semjs');
  }
}

export = Injector;