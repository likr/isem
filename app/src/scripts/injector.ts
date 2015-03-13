'use strict';
/* Use only typing */
import typeAngular = require('angular');
import cwlog       = require('cw-log');

/* isem globals */
import app       = require('./app');
import constants = require('./constants');

/* modules */
import CsvToEgridConverter      = require('./modules/csv-to-egrid-converter');
import NetworkDiagramDispatcher = require('./modules/network-diagram-dispatcher');
import NetworkDiagramRenderer   = require('./modules/network-diagram-renderer');
import VariableArrayStore       = require('./modules/variable-array-store');
import Vertex                   = require('./modules/vertex');

/* views */
import AddLatentVariable = require('../views/dialogs/add-latent-variable');
import AddRelation       = require('../views/dialogs/add-relation');
import ImportFile        = require('../views/dialogs/import-file');
import ManageRelation    = require('../views/dialogs/manage-relation');
import RenameVariable    = require('../views/dialogs/rename-variable');

/**
 * Injector is the class that injects libraries
 * This will be stubbed when do tests
 *
 * Implemented as a static in the class
 * because of define the same name as a global defined
 * (e.g. document, FileReader)
 */
class Injector {
  /* for browser */
  static angular(): typeof typeAngular {
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
    return require('cw-log').logger(4);
  }

  static Promise(): ng.IQService {
    return Injector.angular().injector(['ng']).get('$q');
  }

  static semjs(): typeof sem {
    return require('semjs');
  }

  /* for isem */
  static app(): typeof app {
    return require('./app');
  }

  static constants(): typeof constants {
    return require('./constants');
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

  /* modules */
  static CsvToEgridConverter(): CsvToEgridConverter.API {
    return require('./modules/csv-to-egrid-converter');
  }

  static NetworkDiagramDispatcher(): NetworkDiagramDispatcher.API {
    return require('./modules/network-diagram-dispatcher').singleton;
  }

  static NetworkDiagramRenderer(): NetworkDiagramRenderer.API {
    return require('./modules/network-diagram-renderer').singleton;
  }

  static VariableArrayStore(): VariableArrayStore.API {
    return require('./modules/variable-array-store').singleton;
  }

  static Vertex(): typeof Vertex {
    return require('./modules/vertex');
  }

  /* views */
  static AddLatentVariable(): typeof AddLatentVariable {
    return require('../views/dialogs/add-latent-variable');
  }

  static AddRelation(): typeof AddRelation {
    return require('../views/dialogs/add-relation');
  }

  static ImportFile(): typeof ImportFile {
    return require('../views/dialogs/import-file');
  }

  static ManageRelation(): typeof ManageRelation {
    return require('../views/dialogs/manage-relation');
  }

  static RenameVariable(): typeof RenameVariable {
    return require('../views/dialogs/rename-variable');
  }
}

export = Injector;