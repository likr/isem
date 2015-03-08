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
  onAddRelation   (listener: typeof lsnrType): void;
  onAddVariable   (listener: typeof lsnrType): void;
  onImportFile    (listener: typeof lsnrType): void;
  onRedrawDiagram (listener: typeof lsnrType): void;
  onRemoveRelation(listener: typeof lsnrType): void;
  onUpdateDiagram (listener: typeof lsnrType): void;

  onDisableVertexDisplay(listener: typeof lsnrType): void;
  onEnableVertexDisplay (listener: typeof lsnrType): void;
  onToggleVertexDisplay (listener: typeof lsnrType): void;
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
