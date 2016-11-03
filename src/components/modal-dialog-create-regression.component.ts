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
    <label for="dependentVariable">被説明変数</label>
    <select id="dependentVariable" name="dependentVariable">
      <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
    </select>

    <label *ngFor="let v of variables">
      <input type="checkbox" name="variable" [attr.value]="v.id">{{v.key}}
    </label>

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

  constructor(private modalDialog: ModalDialogActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.variables$.subscribe((v) => this.variables = v)
    )
  }

  onClickPrimary() {
    //
  }

}
