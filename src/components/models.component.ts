import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {ModalDialogActions} from '../application/modal-dialog'
import {AppDispatcher} from '../application/app'

@Component({
  selector: 'is-models',
  template: `
    <style>
      :host {
        background: #ECEFF1;
        display: block;
        margin: 0;
        width: 240px;
        height: 100%;
        overflow-y: scroll;
        border-right: 1px solid #B0BEC5;
      }
      ul {
        margin-left: 10px;
        margin-top: 10px;
      }
      li {
        line-height: 32px;
      }
    </style>
    <h2>回帰</h2>
    <button (click)="onClickRegression()">追加</button>
    <ul>
      <li *ngFor="let label of regressions">{{label}}</li>
    </ul>

    <h2>潜在変数</h2>
    <button (click)="onClickLatentVariableRelation()">追加</button>
    <ul>
      <li *ngFor="let label of latentVariableRelations">{{label}}</li>
    </ul>

    <h2>共分散</h2>
    <button (click)="onClickCovariance()">追加</button>
    <ul>
      <li *ngFor="let label of covariances">{{label}}</li>
    </ul>

    <h2>切片</h2>
    <button (click)="onClickIntercept()">追加</button>
    <ul>
      <li *ngFor="let label of intercepts">{{label}}</li>
    </ul>
  `
})
export class ModelsComponent extends AbstractComponent {

  @Input() covariances:             string[]
  @Input() intercepts:              string[]
  @Input() latentVariableRelations: string[]
  @Input() regressions:             string[]

  constructor(private modalDialog: ModalDialogActions,
              private dispatcher: AppDispatcher) {
    super()
  }

  onClickRegression() {
    this.dispatcher.emit(this.modalDialog.openCreateRegression())
  }

  onClickLatentVariableRelation() {
    this.dispatcher.emit(this.modalDialog.openCreateLatentVariableRelation())
  }

  onClickCovariance() {
    this.dispatcher.emit(this.modalDialog.openCreateCovariance())
  }

  onClickIntercept() {
    this.dispatcher.emit(this.modalDialog.openCreateIntercept())
  }

}
