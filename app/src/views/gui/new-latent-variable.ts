'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();
var localized = injector.localized();

var directiveName = 'isemGuiNewLatentVariable';

interface Scope extends ng.IScope {
  localized: any;
  locale(): string;
  variableArray(): Array<typeVertex.Props>;
}

class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    this.$scope.localized = localized(this.$scope.locale(), directiveName);
  }

  /**
   * @returns {void}
   */
  newLatentVariable() {
    var labelArray = ((arr: typeVertex.Props[]) => {
      if (!arr) {return []}
      return arr.map((v) => {
        return v.label;
      });
    })(this.$scope.variableArray());
    var defaultName = this.$scope.localized.defaultVariableName();

    var name = this.createNewLatentVariableName(labelArray, defaultName);
    this.$rootScope.$broadcast(constants.ADD_LATENT_VARIABLE, name);
  }

  /**
   * @param {string[]} labelArray
   * @param {string} defaultName
   * @returns {string}
   */
  private createNewLatentVariableName(labelArray: string[], defaultName: string) {
    var isDefault = (v: string) => {
      return v.split(' ')[0] === defaultName;
    };

    var alreadyExists = labelArray.some((v) => {
      return isDefault(v);
    });

    var name = (() => {
      if (!alreadyExists || !labelArray) {return defaultName}

      var existsDefaultWithoutNumber = false;
      var min: number;
      var max = 2;

      var retName: string;
      labelArray.forEach((v) => {
        if (!isDefault(v)) {return}

        if (v.split(' ').length === 1) {
          existsDefaultWithoutNumber = true;
          min = 1;
        }

        var num = parseInt(v.split(' ').pop(), 10);

        if (isNaN(num)) {
          retName = [defaultName, max].join(' ');
          return;
        }

        min = (!min || num < min) ? num : min;
        if (max === num) {
          max += 1;
        }

        if (min === 1 && !existsDefaultWithoutNumber) {
          retName = defaultName;
          return;
        }
        retName = [defaultName, max].join(' ');
      });

      return retName;
    })();

    return name;
  }
}

class Definition {
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      scope: {
        locale:        '&isemIoLocale',
        variableArray: '&isemIoVariableArray'
      },
      templateUrl: app.viewsDir.gui + 'new-latent-variable.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
