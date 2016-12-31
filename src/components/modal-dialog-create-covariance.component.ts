import {Component} from '@angular/core'

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
        bottom: 20px/*modalDialogComponentCssBodyPadding*/;
        right:  20px/*modalDialogComponentCssBodyPadding*/;
      }
    </style>

    <h2>{{'ModalDialogCreateCovariance.Header' | translate}}</h2>

    <div class="scrollable">
      <div class="fieldGroup">
        <label
          class="selectLabel"
          for  ="variable1"
        >{{'Variable1' | translate}}</label>
        <select
          id         ="variable1"
          name       ="variable1"
          [(ngModel)]="variable1"
        >
          <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
        </select>
      </div>
        
      <div class="fieldGroup">
        <label
          class="selectLabel"
          for  ="variable2"
        >{{'Variable2' | translate}}</label>
        <select
          id         ="variable2"
          name       ="variable2"
          [(ngModel)]="variable2"
        >
          <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
        </select>
      </div>
    </div>

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
    const setVariables = (v: VariableVM[]) => {
      this.variables = v
    }

    this.subscriptions.push(
      this.store.variables$.skip(1).subscribe((v) => {
        setVariables(v)
      })
    )

    this.subscriptions.push(
      this.store.variables$.take(1).subscribe((v) => {
        setVariables(v)
        this.variable1 = v[0].id
        this.variable2 = 1 < v.length ? v[1].id : v[0].id
      })
    )
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.projects.addCovariance(this.variable1, this.variable2),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
