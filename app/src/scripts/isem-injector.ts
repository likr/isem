'use strict';
/* globals */
import app       = require('./app');
import constants = require('./constants');
import styles    = require('./styles');

/* modules */
import CsvToAlphaConverter      = require('./modules/csv-to-alpha-converter');
import NetworkDiagramDispatcher = require('./modules/network-diagram-dispatcher');
import NetworkDiagramRenderer   = require('./modules/network-diagram-renderer');
import VariableArrayStore       = require('./modules/variable-array-store');
import Vertex                   = require('./modules/vertex');

/* views */
import AddLatentVariable = require('../views/dialogs/add-latent-variable');
import AddRelation       = require('../views/dialogs/add-relation');
import ImportFile        = require('../views/dialogs/import-file');
import ManageRelation    = require('../views/dialogs/manage-relation');

/**
 * Injector is the class that injects modules in the domain of isem.
 * This will be stubbed when do tests.
 */
class IsemInjector {
  static AddLatentVariable(): typeof AddLatentVariable {
    return require('../views/dialogs/add-latent-variable');
  }

  static AddRelation(): typeof AddRelation {
    return require('../views/dialogs/add-relation');
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

  static ImportFile(): typeof ImportFile {
    return require('../views/dialogs/import-file');
  }

  static localized(): (locale: string, directiveName: string) => any {
    return (locale, directiveName) => {
      var localized: any = {};
      switch (locale) {
        case 'en':
          localized = require('./localized/en')[directiveName];
          break;
        case 'ja':
          localized = require('./localized/ja')[directiveName];
          break;
      }

      return localized;
    };
  }

  static ManageRelation(): typeof ManageRelation {
    return require('../views/dialogs/manage-relation');
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