import {Component, Input} from '@angular/core'

import {KEYCODES} from './constant'
import {WindowRef} from './window-ref.service';
import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'

export type ModalDialogType = 'loadFile'
export interface ModalDialogParams {
  type?: ModalDialogType
  isVisible?: boolean
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
        top: 0;
        left: 0;
        z-index: 10000;
        width: 100vw;
        height: 100vh;

        background-color: #333333;
        opacity: .5;
      }
      .body {
        background-color: #fff;
        width: 600px;
        height: 400px;
        z-index: 10010;
        position: relative;
        top: -100px;
      }
    </style>

    <div
      *ngIf="isVisible"
      class="background"
    >
      <div class="body">
        <is-modal-dialog-load-file
          *ngIf="type === 'loadFile'"
        ></is-modal-dialog-load-file>
      </div>
    </div>
  `
})
export class ModalDialogComponent {

  @Input() type: ModalDialogType
  @Input() isVisible: boolean
  private window: Window
  private disposers: Function[]

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher,
              windowRef: WindowRef) {
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
