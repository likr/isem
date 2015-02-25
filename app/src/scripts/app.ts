/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../node_modules/cw-modal/api/cw-modal.d.ts" />
'use strict';

var angular = require('angular');
require('angular-route');
require('cw-modal');

export var appName = 'egrid-sem';
export var externalModule = ['ngRoute', 'cwModal'];
angular.module(appName, externalModule);

/**
 * Global styles for using calculation
 */
export var styles: any = {};
styles.isemHeader = {
  height: '5em'
};

styles.isemFooter = {
  height: '120px'
};

styles.mainDisplay = {};
styles.mainDisplay.heightRawExp = '(100vh - ' + styles.isemHeader.height + ' - ' + styles.isemFooter.height + ')';
styles.mainDisplay.height = 'calc' + styles.mainDisplay.heightRawExp;

styles.clearBootstrapMargin = {
  'margin-left': '-15px'
};

/**
 * Specify the directory path
 */
export var viewsDir = {
  commonRoles:    'src/views/concretes/common-roles/',
  dialogs:        'src/views/dialogs/',
  directives:     'src/views/directives/',
  networkDiagram: 'src/views/concretes/network-diagram/',
  newDialogs:     'src/views/concretes/dialogs/',
  screens:        'src/views/screens/'
};

/**
 * @constructor
 * @ngInject
 */
function RouteConfig(
  $routeProvider: ng.route.IRouteProvider,
  $locationProvider: ng.ILocationProvider
) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {template: '<isem-screen-network-diagram></isem-screen-network-diagram>'})
    .otherwise({redirectTo: '/'});
}

angular.module(appName).config(RouteConfig);