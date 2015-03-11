'use strict';
import AbstractDispatcher = require('../abstracts/dispatcher');
import Injector = require('../injector');
var angular = Injector.angular();

// DO NOT change var name of 'constants'
// by reason of the convenience to find/replace
import IsemInjector = require('../isem-injector');
var constants = IsemInjector.constants();

declare var lsnrType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  addHandlers(handlers: any): void;

  onAddEgmHandler (lsnr: typeof lsnrType): void;
  onAddRelation   (lsnr: typeof lsnrType): void;
  onAddVariable   (lsnr: typeof lsnrType): void;
  onImportFile    (lsnr: typeof lsnrType): void;
  onRedrawDiagram (lsnr: typeof lsnrType): void;
  onRemoveRelation(lsnr: typeof lsnrType): void;
  onUpdateDiagram (lsnr: typeof lsnrType): void;

  onDisableVertexDisplay(lsnr: typeof lsnrType): void;
  onEnableVertexDisplay (lsnr: typeof lsnrType): void;
  onToggleVertexDisplay (lsnr: typeof lsnrType): void;
}

interface Handlers {
  addEgmHandlers: typeof lsnrType;
  updateDiagram:  typeof lsnrType;
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

  /**
   * @param {*} handlers
   */
  addHandlers(handlers: Handlers) {
    super.on(constants.UPDATE_DIAGRAM,   handlers.updateDiagram);
    super.on(constants.ADD_EGM_HANDLERS, handlers.addEgmHandlers);
  }

  /* methods for add listener */
  onAddRelation   (lsnr: typeof lsnrType) {super.on(constants.ADD_RELATION, lsnr)}
  onAddVariable   (lsnr: typeof lsnrType) {super.on(constants.ADD_LATENT_VARIABLE, lsnr)}
  onImportFile    (lsnr: typeof lsnrType) {super.on(constants.IMPORT_FILE, lsnr)}
  onRedrawDiagram (lsnr: typeof lsnrType) {super.on(constants.REDRAW_DIAGRAM, lsnr)}
  onRemoveRelation(lsnr: typeof lsnrType) {super.on(constants.REMOVE_RELATION, lsnr)}
  onUpdateDiagram (lsnr: typeof lsnrType) {super.on(constants.UPDATE_DIAGRAM, lsnr)}

  /* control vertex display */
  onDisableVertexDisplay(lsnr: typeof lsnrType) {super.on(constants.DISABLE_VERTEX_DISPLAY, lsnr)}
  onEnableVertexDisplay (lsnr: typeof lsnrType) {super.on(constants.ENABLE_VERTEX_DISPLAY, lsnr)}
  onToggleVertexDisplay (lsnr: typeof lsnrType) {super.on(constants.TOGGLE_VERTEX_DISPLAY, lsnr)}
}

export var singleton = new Dispatcher();
