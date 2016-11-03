import {Component} from '@angular/core'

import {css as ModalDialogCss} from './modal-dialog.component'
import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsActions, ProjectsStore} from '../application/project'
import {ObservedVariableVM, LatentVariableVM} from '../application/variable'

@Component({
  selector : 'is-modal-dialog-create-latent-variable-relation',
  styleUrls: ['src/shared-styles/modal-dialog.css'],
  template : `
    <style>
      .buttons {
        position: absolute;
        bottom: ${ModalDialogCss.bodyPadding};
        right:  ${ModalDialogCss.bodyPadding};
      }
    </style>

    <h2>{{'ModalDialogCreateLatentVariableRelation.Header' | translate}}</h2>
    <label for="latentVariable">潜在変数</label>
    <select id="latentVariable" name="latentVariable">
      <option *ngFor="let v of latentVariables" [attr.value]="v.id">{{v.key}}</option>
    </select>

    <label *ngFor="let v of observedVariables">
      <input type="checkbox" name="observedVariable" [attr.value]="v.id">{{v.key}}
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
export class ModalDialogCreateLatentVariableRelationComponent extends AbstractComponent {

  observedVariables: ObservedVariableVM[]
  latentVariables: LatentVariableVM[]

  constructor(private modalDialog: ModalDialogActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.observedVariables$.subscribe((v) => this.observedVariables = v)
    )
    this.subscriptions.push(
      this.store.latentVariables$.subscribe((v) => this.latentVariables = v)
    )
  }

  onClickPrimary() {
    //
  }

}
