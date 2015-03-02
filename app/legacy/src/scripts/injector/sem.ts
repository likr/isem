declare var sem: any;
angular.module('sem-injector', []).factory('sem', () => {
  return <typeof typeSem>sem;
});