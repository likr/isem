declare var egrid: any;
angular.module('egrid-injector', []).factory('egrid', () => {
  return <ModuleEgrid>egrid;
});
