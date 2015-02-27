'use strict';
import i_app = require('./app');
import ctac = require('./modules/csv-to-alpha-converter');
import vad = require('./modules/variable-array-dispatcher');
import vas = require('./modules/variable-array-store');

/**
 * Injector is the class that injects modules in the domain of isem.
 * This will be stubbed when do tests.
 */
class IsemInjector {
  static app(): typeof i_app {
    return require('./app');
  }

  static CsvToAlphaConverter(): typeof ctac {
    return require('./modules/csv-to-alpha-converter');
  }

  static VariableArrayDispatcher(): vad.IVariableArrayDispatcher {
    return require('./modules/variable-array-dispatcher').singleton;
  }

  static VariableArrayStore(): vas.IVariableArrayStore {
    return require('./modules/variable-array-store').singleton;
  }
}

export = IsemInjector;