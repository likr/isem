declare var cov: typeof typeCov;
angular.module('cov-injector', []).factory('cov', () => {
  return cov;
});