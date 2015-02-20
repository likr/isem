/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
'use strict';

var angular = require('angular');
require('angular-route');

export var appName = 'egrid-sem';
export var externalModule = ['ngRoute'];
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

styles.mainDisplay = {
  height: 'calc(100vh - ' + styles.isemHeader.height + ' - ' + styles.isemFooter.height + ')'
};

/**
 * Specify the directory path
 */
export var viewsDir = {
  dialogs:    'src/views/dialogs/',
  directives: 'src/views/directives/',
  screens:    'src/views/screens/'
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