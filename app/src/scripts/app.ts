module isem {
  export var appName = 'egrid-sem';
  export var externalModules = [
    'egrid-injector',
    'sem-injector',
    'cov-injector',
    'd3-injector',
    'jquery-injector'
  ];
}

angular.module(isem.appName, isem.externalModules);