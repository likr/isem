import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {ModalDialogActions} from '../application/modal-dialog'
import {AppDispatcher} from '../application/app'
import {ProjectsActions} from '../application/project'

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
        padding: 8px/* appComponentCssPadding */;
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
      <li *ngFor="let v of regressions">
        <span class="label">{{v.label}}</span>
        <is-ui-delete-icon
          (click)="onClickRemoveRegression(v.id)"
        ></is-ui-delete-icon>
      </li>
    </ul>

    <h2>
      <span class="label">{{'LatentVariable' | translate}}</span>
      <is-ui-add-button
        (click)="onClickLatentVariableRelation()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let v of latentVariableRelations">
        <span class="label">{{v.label}}</span>
        <is-ui-delete-icon
          (click)="onClickRemoveLatentVariableRelation(v.id)"
        ></is-ui-delete-icon>
      </li>
    </ul>

    <h2>
      <span class="label">{{'Covariance' | translate}}</span>
      <is-ui-add-button
        (click)="onClickCovariance()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let v of covariances">
        <span class="label">{{v.label}}</span>
        <is-ui-delete-icon
          (click)="onClickRemoveCovariance(v.id)"
        ></is-ui-delete-icon>
      </li>
    </ul>

    <h2>
      <span class="label">{{'Intercept' | translate}}</span>
      <is-ui-add-button
        (click)="onClickIntercept()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let v of intercepts">
        <span class="label">{{v.label}}</span>
        <is-ui-delete-icon
          (click)="onClickRemoveIntercept(v.id)"
        ></is-ui-delete-icon>
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
              private projects: ProjectsActions,
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

  onClickRemoveRegression(id: string) {
    this.dispatcher.emit(this.projects.removeRegression(id))
  }

  onClickRemoveLatentVariableRelation(id: string) {
    this.dispatcher.emit(this.projects.removeLatentVariableRelation(id))
  }

  onClickRemoveCovariance(id: string) {
    this.dispatcher.emit(this.projects.removeCovariance(id))
  }

  onClickRemoveIntercept(id: string) {
    this.dispatcher.emit(this.projects.removeIntercept(id))
  }

}
