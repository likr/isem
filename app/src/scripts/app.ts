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
 * @constructor
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
RouteConfig.$inject = ['$routeProvider', '$locationProvider'];

angular.module(appName).config(RouteConfig);