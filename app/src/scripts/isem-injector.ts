'use strict';
import app = require('./app');
import CsvToAlphaConverter = require('./modules/csv-to-alpha-converter');
import VariableArrayDispatcher = require('./modules/variable-array-dispatcher');
import VariableArrayStore = require('./modules/variable-array-store');
import Vertex = require('./modules/vertex');

/**
 * Injector is the class that injects modules in the domain of isem.
 * This will be stubbed when do tests.
 */
class IsemInjector {
  static app(): typeof app {
    return require('./app');
  }

  static CsvToAlphaConverter(): typeof CsvToAlphaConverter {
    return require('./modules/csv-to-alpha-converter');
  }

  static VariableArrayDispatcher(): VariableArrayDispatcher.API {
    return require('./modules/variable-array-dispatcher').singleton;
  }

  static VariableArrayStore(): VariableArrayStore.API {
    return require('./modules/variable-array-store').singleton;
  }

  static Vertex(): Vertex.Constructor {
    return require('./modules/vertex');
  }
}

export = IsemInjector;