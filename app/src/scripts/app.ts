/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/cw-log/cw-log.d.ts" />
/// <reference path="../../../typings/cw-modal/cw-modal.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/egrid-core/egrid-core.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/semjs/sem.d.ts" />
'use strict';
import injector = require('./injector');
var angular = injector.angular();

export var appName = 'egrid-sem';
export var externalModule = ['ngRoute', 'cwModal'];
// e.g. 'ja', 'en'... see src/scripts/localized
export var defaultLocale = 'ja';
angular.module(appName, externalModule);

/**
 * Specify the directory path
 */
export var viewsDir = {
  commonRoles:    'src/views/common-roles/',
  dialogs:        'src/views/dialogs/',
  directives:     'src/views/directives/',
  gui:            'src/views/gui/',
  networkDiagram: 'src/views/network-diagram/',
  screens:        'src/screens/'
};

/**
 * @constructor
 * @ngInject
 */
function RouteConfig(
  $routeProvider: ng.route.IRouteProvider
) {
  $routeProvider
    .when('/', {template: '<isem-screen-network-diagram isem-io-locale="$root.locale"></isem-screen-network-diagram>'})
    .otherwise({redirectTo: '/'});
}

/**
 * @constructor
 * @ngInject
 */
function RunCallback($rootScope: any) {
  $rootScope.locale = defaultLocale;
}

angular.module(appName).config(RouteConfig);
angular.module(appName).run(RunCallback);
