import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {ObservedVariableVM, LatentVariableVM} from '../application/variable'
import {AppActions, AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'

@Component({
  selector: 'is-variables',
  template: `
    <style>
      :host {
        background: #cfd8dc;
        display: block;
        margin: 0;
        width: 320px;
        height: 100%;
        overflow-y: scroll;
        border-right: 1px solid #90a4ae;
      }
      ul {
        margin-left: 10px;
        margin-top: 10px;
      }
      li {
        line-height: 32px;
      }
    </style>
    <ul>
      <li *ngFor="let variable of observedVariables">
        {{variable.key}}<button (click)="onClickObservedVariable(variable)">詳細</button>
      </li>
    </ul>
    <button (click)="onClickAddLatentVariable()">潜在変数を追加</button>
    <ul>
      <li *ngFor="let variable of latentVariables">
        {{variable.key}}<button (click)="onClickLatentVariable(variable)">詳細</button>
      </li>
    </ul>
  `
})
export class VariablesComponent extends AbstractComponent {

  @Input() observedVariables: ObservedVariableVM[]
  @Input() latentVariables: LatentVariableVM[]

  constructor(private appActions: AppActions,
              private modalDialog: ModalDialogActions,
              private dispatcher: AppDispatcher) {
    super()
  }

  onClickAddLatentVariable() {
    this.dispatcher.emit(this.appActions.addLatentVariable())
  }

  onClickObservedVariable(v: ObservedVariableVM) {
    this.dispatcher.emit(this.modalDialog.openObservedVariableDetail(v))
  }

  onClickLatentVariable(v: LatentVariableVM) {
    this.dispatcher.emit(this.modalDialog.openLatentVariableDetail(v))
  }

}
