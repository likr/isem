import {Component} from '@angular/core'

import {css as ModalDialogCss} from './modal-dialog.component'
import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsStore, ProjectsActions} from '../application/project'
import {VariableVM} from '../application/variable'

@Component({
  selector : 'is-modal-dialog-create-covariance',
  styleUrls: ['src/shared-styles/modal-dialog.css'],
  template : `
    <style>
      .buttons {
        position: absolute;
        bottom: ${ModalDialogCss.bodyPadding};
        right:  ${ModalDialogCss.bodyPadding};
      }
    </style>

    <h2>{{'ModalDialogCreateCovariance.Header' | translate}}</h2>
    <label for="variable1">変数1</label>
    <select
      id="variable1"
      name="variable1"
      [(ngModel)]="variable1"
    >
      <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
    </select>
    
    <label for="variable2">変数2</label>
    <select
      id="variable2"
      name="variable2"
      [(ngModel)]="variable2"
    >
      <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
    </select>

    <div class="buttons">
      <is-ui-button
        [label]="'OK' | translate"
        [type] ="'primary'"
        (clickButton)="onClickPrimary($event)"
      ></is-ui-button>
    </div>
  `
})
export class ModalDialogCreateCovarianceComponent extends AbstractComponent {

  variables: VariableVM[]
  variable1: string // uuid
  variable2: string // uuid

  constructor(private modalDialog: ModalDialogActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
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

    p.then((variables) => {
      this.variable1 = variables[0].id
      this.variable2 = 1 < variables.length
        ? this.variables[1].id
        : this.variables[0].id
    })
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.projects.addCovariance(this.variable1, this.variable2),
      this.modalDialog.close()
    ])
  }

}
