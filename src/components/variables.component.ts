import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {ObservedVariableVM, LatentVariableVM} from '../application/variable'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsActions} from '../application/project'

@Component({
  selector: 'is-variables',
  template: `
    <style>
      :host {
        background: #cfd8dc;
        display: block;
        margin: 0;
        width: 240px;
        height: 100%;
        padding: 8px/* appComponentCssPadding */;
        overflow-y: scroll;
        border-right: 1px solid #90a4ae;
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
      <span class="label">{{'ObservedVariable' | translate}}</span>
    </h2>
    <ul>
      <li *ngFor="let v of observedVariables">
        <span class="label">{{v.key}}</span>
        <is-ui-info-icon
          (click)="onClickObservedVariable(v)"
        ></is-ui-info-icon>
      </li>
    </ul>
    
    <h2>
      <span class="label">{{'LatentVariable' | translate}}</span>
      <is-ui-add-button
        (click)="onClickAddLatentVariable()"
      ></is-ui-add-button>
    </h2>
    <ul>
      <li *ngFor="let v of latentVariables">
        <span class="label">{{v.key}}</span>
        <is-ui-info-icon
          (click)="onClickLatentVariable(v)"
        ></is-ui-info-icon>
      </li>
    </ul>
  `
})
export class VariablesComponent extends AbstractComponent {

  @Input() observedVariables: ObservedVariableVM[]
  @Input() latentVariables: LatentVariableVM[]

  constructor(private projects: ProjectsActions,
              private modalDialog: ModalDialogActions,
              private dispatcher: AppDispatcher) {
    super()
  }

  onClickAddLatentVariable() {
    this.dispatcher.emit(this.projects.addLatentVariable())
  }

  onClickObservedVariable(v: ObservedVariableVM) {
    this.dispatcher.emit(this.modalDialog.openObservedVariableDetail(v))
  }

  onClickLatentVariable(v: LatentVariableVM) {
    this.dispatcher.emit(this.modalDialog.openLatentVariableDetail(v))
  }

}
