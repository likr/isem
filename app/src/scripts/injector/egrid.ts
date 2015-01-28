declare var egrid: ModuleEgrid;
angular.module('egrid-injector', []).factory('egrid', () => {
  return egrid;
});