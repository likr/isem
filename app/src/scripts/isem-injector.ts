'use strict';
import app = require('./app');
import CsvToAlphaConverter = require('./modules/csv-to-alpha-converter');
import NetworkDiagramDispatcher = require('./modules/network-diagram-dispatcher');
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

  static NetworkDiagramDispatcher(): NetworkDiagramDispatcher.API {
    return require('./modules/network-diagram-dispatcher').singleton;
  }

  static VariableArrayStore(): VariableArrayStore.API {
    return require('./modules/variable-array-store').singleton;
  }

  static Vertex(): Vertex.Constructor {
    return require('./modules/vertex');
  }
}

export = IsemInjector;