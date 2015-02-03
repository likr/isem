declare var sem: typeof typeSem;
angular.module('sem-injector', []).factory('sem', () => {
  return sem;
});