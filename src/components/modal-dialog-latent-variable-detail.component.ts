import {Component} from '@angular/core'

import {css as ModalDialogCss} from './modal-dialog.component'
import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsStore} from '../application/project'
import {LatentVariableVM} from '../application/variable'
import {ProjectsActions} from '../application/project/projects.actions'

@Component({
  selector : 'is-modal-dialog-latent-variable-detail',
  styleUrls: ['src/shared-styles/modal-dialog.css'],
  template : `
    <style>
      .buttons {
        position: absolute;
        bottom: ${ModalDialogCss.bodyPadding};
        right:  ${ModalDialogCss.bodyPadding};
      }
    </style>

    <h2>{{'ModalDialogLatentVariableDetail.Header' | translate}}</h2>
    <p>{{variable.key}}</p>
    <input type="text" [(ngModel)]="newKey">
    <button (click)="onClickRemove()">{{'Remove' | translate}}</button>

    <div class="buttons">
      <is-ui-button
        [label]="'Cancel' | translate"
        [type] ="'default'"
        (clickButton)="onClickSecondary($event)"
      ></is-ui-button>

      <is-ui-button
        [label]="'OK' | translate"
        [type] ="'primary'"
        (clickButton)="onClickPrimary($event)"
      ></is-ui-button>
    </div>
  `
})
export class ModalDialogLatentVariableDetailComponent extends AbstractComponent {

  private variable: LatentVariableVM
  private newKey: string

  constructor(private modalDialog: ModalDialogActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.currentLatentVariable$.subscribe((v) => {
        this.variable = v
        this.newKey   = this.variable.key
      })
    )
  }

  onClickRemove() {
    this.dispatcher.emitAll([
      this.projects.removeLatentVariable(this.variable),
      this.modalDialog.close()
    ])
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.projects.changeLatentVariableKey(this.variable, this.newKey),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
