'use strict';
import AbstractDispatcher = require('../abstracts/dispatcher');
import Injector = require('../injector');
var angular = Injector.angular();

// DO NOT change var name of 'constants'
// by reason of the convenience to find/replace
import IsemInjector = require('../isem-injector');
var constants = IsemInjector.constants();

declare var listenerType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  onAddRelation        (listener: typeof listenerType): void;
  onAddVariable        (listener: typeof listenerType): void;
  onImportFile         (listener: typeof listenerType): void;
  onRedrawDiagram      (listener: typeof listenerType): void;
  onRemoveRelation     (listener: typeof listenerType): void;
  onToggleVertexDisplay(listener: typeof listenerType): void;
  onUpdateDiagram      (listener: typeof listenerType): void;
}

class Dispatcher extends AbstractDispatcher {
  /* protected */
  protected $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    super();
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @returns {void}
   */
  protected init() {
    super.init();
  }

  /* methods for add listener */
  onAddRelation(listener: typeof listenerType) {
    super.on(constants.ADD_RELATION, listener);
  }

  onAddVariable(listener: typeof listenerType) {
    super.on(constants.ADD_LATENT_VARIABLE, listener);
  }

  onImportFile(listener: typeof listenerType) {
    super.on(constants.IMPORT_FILE, listener);
  }

  onRedrawDiagram(listener: typeof listenerType) {
    super.on(constants.REDRAW_DIAGRAM, listener);
  }

  onRemoveRelation(listener: typeof listenerType) {
    super.on(constants.REMOVE_RELATION, listener);
  }

  onToggleVertexDisplay(listener: typeof listenerType) {
    super.on(constants.TOGGLE_VERTEX_DISPLAY, listener);
  }

  onUpdateDiagram(listener: typeof listenerType) {
    super.on(constants.UPDATE_DIAGRAM, listener);
  }
}

export var singleton = new Dispatcher();
