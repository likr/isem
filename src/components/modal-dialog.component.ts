import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {AppActions, AppDispatcher} from '../application/app'
import {WindowRef} from '../services'
import {KEYCODES} from '../constant'

export type ModalDialogType = 'loadFile'
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
    </div>
  `
})
export class ModalDialogComponent extends AbstractComponent {

  @Input() type: ModalDialogType
  @Input() isVisible: boolean
  private window: Window
  private disposers: Function[]

  constructor(private actions: AppActions,
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
        this.dispatcher.emit(this.actions.closeModalDialog())
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
