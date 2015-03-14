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

export class Controller {
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

    var name = Controller.createNewLatentVariableName(labelArray, defaultName);
    this.$rootScope.$broadcast(constants.ADD_LATENT_VARIABLE, name);
  }

  /**
   * @param {string[]} labelArray
   * @param {string} _defaultName
   * @returns {string}
   */
  private static createNewLatentVariableName(labelArray: string[], _defaultName: string) {
    function isDefault(label: string): boolean {
      return label.split(' ')[0] === _defaultName;
    }

    function getSerial(label: string): number {
      var numPart = label.split(' ').slice(1).join(' ');
      if (/\D/.test(numPart)) {return NaN}
      return parseInt(numPart, 10);
    }

    function defaultName(n?: number): string {
      if (!n || n < 2) {return _defaultName}
      return [_defaultName, n].join(' ');
    }

    /***** body *****/
    if (!labelArray) {return defaultName()}
    if (labelArray.length === 1 && labelArray[0] === _defaultName) {return defaultName(2)}

    var alwaysExists = labelArray.some(label => isDefault(label));
    if (!alwaysExists) {return defaultName()}

    var next: number;
    var cache: number[] = [];
    labelArray.forEach((label) => {
      if (!isDefault(label)) {return}
      if (label === _defaultName) {
        next = 2;
        cache.forEach((v) => {
          next = (next === v) ? next + 1 : next;
        });
        return;
      }
      var s = getSerial(label);
      if (next === s) {
        next += 1;
        cache.forEach((v) => {
          next = (next === v) ? next + 1 : next;
        });
        return;
      }
      cache.push(s);
      cache.sort((a, b) => a - b);
    });

    return defaultName(next);
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
