import {Component, Input, HostListener} from '@angular/core';

import {KEYCODES} from './constant';
import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';

export type ModalDialogType = 'loadFile';
export interface ModalDialogParams {
  isVisible?: boolean;
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
        width: 100px;
        height: 100px;
        z-index: 10010;
      }
    </style>
    <div
      *ngIf="isVisible"
      class="background"
    >
      <div class="body">
        ダイアログボックス
      </div>
    </div>
  `
})
export class ModalDialogComponent {

  @Input() isVisible: boolean;
  private disposers: Function[];

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {
    this.disposers = [];
  }

  ngOnInit() {
    const listener = (ev: KeyboardEvent) => {
      if (this.isVisible && ev.keyCode === KEYCODES.esc) {
        this.dispatcher.emit(this.actions.closeModalDialog());
      }
    };
    window.addEventListener('keyup', listener);
    this.disposers.push(() => {
      window.removeEventListener('keyup', listener);
    });
  }

  ngOnDestroy() {
    this.disposers.forEach((dispose) => dispose());
  }

}
