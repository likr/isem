import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {WindowRef} from '../services'
import {KEYCODES} from '../constant'
import {ModalDialogActions} from '../application/modal-dialog'

export type ModalDialogType =
  'loadFile' |
  'observedVariableDetail' |
  'latentVariableDetail'

export interface ModalDialogParams {
  type: ModalDialogType
  isVisible: boolean
}

export const css = {
  bodyWidth  : '600px',
  bodyHeight : '400px',
  bodyPadding: '20px'
}

@Component({
  selector: 'is-modal-dialog',
  template: `
    <style>
      .background {
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        top:  0;
        left: 0;
        z-index: 10000;
        width:  100vw;
        height: 100vh;

        background-color: #333333;
        opacity: .5;
      }
      .body {
        background-color: #fff;
        width:  ${css.bodyWidth};
        height: ${css.bodyHeight};
        z-index: 10010;
        position: fixed;
        top:  calc(50% - ${css.bodyHeight} / 1.3);
        left: calc(50% - ${css.bodyWidth}  / 2);
        padding: ${css.bodyPadding};
      }
    </style>

    <div
      *ngIf="isVisible"
      class="background"
    ></div>
    <div
      *ngIf="isVisible"
      class="body"
    >
      <is-modal-dialog-load-file
        *ngIf="type === 'loadFile'"
      ></is-modal-dialog-load-file>

      <is-modal-dialog-observed-variable-detail
        *ngIf="type === 'observedVariableDetail'"
      ></is-modal-dialog-observed-variable-detail>

      <is-modal-dialog-latent-variable-detail
        *ngIf="type === 'latentVariableDetail'"
      ></is-modal-dialog-latent-variable-detail>
    </div>
  `
})
export class ModalDialogComponent extends AbstractComponent {

  @Input() type: ModalDialogType
  @Input() isVisible: boolean
  private window: Window
  private disposers: Function[]

  constructor(private modalDialog: ModalDialogActions,
              private dispatcher: AppDispatcher,
              windowRef: WindowRef) {
    super()
    this.window = windowRef.nativeWindow
    this.disposers = []
  }

  ngOnInit() {
    this.bindKeyEvents()
  }

  bindKeyEvents() {
    const listener = (ev: KeyboardEvent) => {
      if (this.isVisible && ev.keyCode === KEYCODES.esc) {
        this.dispatcher.emit(this.modalDialog.close())
      }
    }

    this.window.addEventListener('keyup', listener)
    this.disposers.push(() => {
      this.window.removeEventListener('keyup', listener)
    })
  }

  ngOnDestroy() {
    this.disposers.forEach((dispose) => dispose())
  }

}
