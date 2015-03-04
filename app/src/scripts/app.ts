/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/cw-modal/cw-modal.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/egrid-core/egrid-core.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/semjs/sem.d.ts" />
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
  commonRoles:    'src/views/common-roles/',
  dialogs:        'src/views/dialogs/',
  directives:     'src/views/directives/',
  networkDiagram: 'src/views/network-diagram/',
  screens:        'src/screens/'
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