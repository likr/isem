/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/egrid-core/egrid-core.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/semjs/sem.d.ts" />
/// <reference path="../../../node_modules/cw-modal/api/cw-modal.d.ts" />
'use strict';
import Injector = require('./injector');
var angular = Injector.angular();

export var appName = 'egrid-sem';
export var externalModule = ['ngRoute', 'cwModal'];
angular.module(appName, externalModule);

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
  // <any> hack so angular.d.ts does not support arg.
  $locationProvider.html5Mode(<any>{
    enabled: true,
    requireBase: false
  });
  $routeProvider
    .when('/', {template: '<isem-screen-network-diagram></isem-screen-network-diagram>'})
    .otherwise({redirectTo: '/'});
}

angular.module(appName).config(RouteConfig);