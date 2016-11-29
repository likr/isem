import {Component} from '@angular/core'

import {css as ModalDialogCss} from './modal-dialog.component'
import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsActions, ProjectsStore} from '../application/project'
import {VariableVM} from '../application/variable/'

@Component({
  selector : 'is-modal-dialog-create-regression',
  styleUrls: ['src/shared-styles/modal-dialog.css'],
  template : `
    <style>
      .buttons {
        position: absolute;
        bottom: ${ModalDialogCss.bodyPadding};
        right:  ${ModalDialogCss.bodyPadding};
      }
    </style>

    <h2>{{'ModalDialogCreateRegression.Header' | translate}}</h2>

    <div class="fieldGroup">
      <label
        class="selectLabel"
        for  ="dependentVariable"
      >{{'DependentVariable' | translate}}</label>
      <select
        id         ="dependentVariable"
        name       ="dependentVariable"
        [(ngModel)]="dependentVariable"
      >
        <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
      </select>
    </div>
  
    <div class="fieldGroup">
      <label
        *ngFor="let v of variables; let i = index"
        class ="checkboxLabel"
      >
        <input
          type       ="checkbox"
          name       ="variable"
          [(ngModel)]="checkboxModel[i]"
        >{{v.key}}
      </label>
    </div>

    <div class="buttons">
      <is-ui-button
        [label]="'OK' | translate"
        [type] ="'primary'"
        (clickButton)="onClickPrimary($event)"
      ></is-ui-button>
    </div>
  `
})
export class ModalDialogCreateRegressionComponent extends AbstractComponent {

  variables: VariableVM[]
  dependentVariable: string // uuid
  checkboxModel: boolean[]

  constructor(private modalDialog: ModalDialogActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
    this.checkboxModel = []
  }

  ngOnInit() {
    const p = new Promise<VariableVM[]>((resolve) => {
      this.subscriptions.push(
        this.store.variables$.subscribe((v) => {
          this.variables = v
          resolve(v)
        })
      )
    })
    p.then((v) => {
      this.checkboxModel = this.variables.map((_) => false)
      this.dependentVariable = v[0].id
    })
  }

  onClickPrimary() {
    const variableIds = this.checkboxModel.map((v, i) => {
      if (v) {
        return this.variables[i].id
      }
    }).filter((v) => !!v)

    this.dispatcher.emitAll([
      this.projects.addRegression(this.dependentVariable, variableIds),
      this.modalDialog.close()
    ])
  }

}
