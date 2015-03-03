'use strict';
import app       = require('./app');
import constants = require('./constants');
import styles    = require('./styles');

import CsvToAlphaConverter      = require('./modules/csv-to-alpha-converter');
import NetworkDiagramDispatcher = require('./modules/network-diagram-dispatcher');
import NetworkDiagramRenderer   = require('./modules/network-diagram-renderer');
import VariableArrayStore       = require('./modules/variable-array-store');
import Vertex                   = require('./modules/vertex');

/**
 * Injector is the class that injects modules in the domain of isem.
 * This will be stubbed when do tests.
 */
class IsemInjector {
  static AddRelation(): {open<T>(data: T): void} {
    return require('../views/concretes/dialogs/add-relation/add-relation');
  }

  static app(): typeof app {
    return require('./app');
  }

  static constants(): typeof constants {
    return require('./constants');
  }

  static CsvToAlphaConverter(): typeof CsvToAlphaConverter {
    return require('./modules/csv-to-alpha-converter');
  }

  static NetworkDiagramDispatcher(): NetworkDiagramDispatcher.API {
    return require('./modules/network-diagram-dispatcher').singleton;
  }

  static NetworkDiagramRenderer(): NetworkDiagramRenderer.API {
    return require('./modules/network-diagram-renderer').singleton;
  }

  static styles(): typeof styles {
    return require('./styles');
  }

  static VariableArrayStore(): VariableArrayStore.API {
    return require('./modules/variable-array-store').singleton;
  }

  static Vertex(): Vertex.Constructor {
    return require('./modules/vertex');
  }
}

export = IsemInjector;