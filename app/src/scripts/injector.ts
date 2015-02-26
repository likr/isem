'use strict';
import i_angular = require('angular');
import i_app = require('./app');

class Injector {
  static angular(): typeof i_angular {
    var angular = require('angular');
    require('angular-route');
    require('cw-modal');
    return angular;
  }

  static app(): typeof i_app {
    return require('./app');
  }

  static d3(): D3.Base {
    return require('d3');
  }

  static document(): Document {
    return document;
  }

  static FileReader(): typeof FileReader {
    return FileReader;
  }
}

export = Injector;