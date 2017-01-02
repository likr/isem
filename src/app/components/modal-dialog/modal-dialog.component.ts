import {Component, OnInit, Input} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {KEYCODES} from "../../constant";
import {ModalDialogActionsService} from "../../application/modal-dialog/modal-dialog-actions.service";
import {AppDispatcherService} from "../../app-dispatcher.service";
import {WindowRefService} from "../../services/window-ref.service";

export type ModalDialogType =
  'loadFile' |
  'observedVariableDetail' |
  'latentVariableDetail' |
  'createRegression' |
  'createLatentVariableRelation' |
  'createCovariance' |
  'createIntercept'

export interface ModalDialogParams {
  type: ModalDialogType
  isVisible: boolean
}

@Component({
  selector: 'is-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent extends AbstractComponent implements OnInit {

  @Input() type: ModalDialogType
  @Input() isVisible: boolean
  private window: Window
  private disposers: Function[]

  constructor(private modalDialog: ModalDialogActionsService,
              private dispatcher: AppDispatcherService,
              windowRef: WindowRefService) {
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
