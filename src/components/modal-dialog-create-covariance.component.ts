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
    <select id="variable1" name="variable1">
      <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
    </select>
    
    <label for="variable2">変数2</label>
    <select id="variable2" name="variable2">
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
