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
}

export = Injector;