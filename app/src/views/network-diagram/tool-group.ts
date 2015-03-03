'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var AddLatentVariable = IsemInjector.AddLatentVariable();
var app               = IsemInjector.app();
var ImportFile        = IsemInjector.ImportFile();
var styles            = IsemInjector.styles();

class Controller {
  /**
   * @returns {void}
   */
  openAddVariable() {
    AddLatentVariable.open();
  }

  /**
   * @returns {void}
   */
  openImportFile() {
    ImportFile.open();
  }
}

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        'box-sizing': 'border-box',
        position: 'absolute'
      }).css({
        width: '100%',
        height: styles.mainToolGroup.height
      }).css({
        'background': styles.colors.mainToolGroupBackground,
        'border-bottom': 'solid 1px ' + styles.colors.footerBorder
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo() {
    return {
      compile: Definition.compile,
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      templateUrl: app.viewsDir.networkDiagram + 'tool-group.html'
    };
  }
}

angular.module(app.appName).directive('isemNetworkDiagramToolGroup', Definition.ddo);
