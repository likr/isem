import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {css as appCss} from './app.component'
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
        width: 320px;
        height: 100%;
        padding: ${appCss.padding};
        overflow-y: scroll;
        border-right: 1px solid #B0BEC5;
      }
      h2 {
        display: flex;
        margin: 8px 0;
        font-size: 14px;
        color: #455A64;
        margin-bottom: 4px;
      }
      li {
        display: flex;
        line-height: 26px;
      }
      .label {
        margin-right: auto;
      }
    </style>

    <h2>
      <span class="label">{{'Regression' | translate}}</span>
      <is-ui-add-button
        (click)="onClickRegression()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let label of regressions">
        <span class="label">{{label}}</span>
      </li>
    </ul>

    <h2>
      <span class="label">{{'LatentVariable' | translate}}</span>
      <is-ui-add-button
        (click)="onClickLatentVariableRelation()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let label of latentVariableRelations">
        <span class="label">{{label}}</span>
      </li>
    </ul>

    <h2>
      <span class="label">{{'Covariance' | translate}}</span>
      <is-ui-add-button
        (click)="onClickCovariance()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let label of covariances">
        <span class="label">{{label}}</span>
      </li>
    </ul>

    <h2>
      <span class="label">{{'Intercept' | translate}}</span>
      <is-ui-add-button
        (click)="onClickIntercept()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let label of intercepts">
        <span class="label">{{label}}</span>
      </li>
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
