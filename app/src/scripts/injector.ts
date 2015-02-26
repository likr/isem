'use strict';
import i_angular = require('angular');
import i_app = require('./app');

class Injector {
  static angular(): typeof i_angular {
    return require('angular');
  }

  static app(): typeof i_app {
    return require('./app');
  }
}

export = Injector;