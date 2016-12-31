import {Component} from '@angular/core'

import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsStore} from '../application/project'
import {ProjectsActions} from '../application/project/projects.actions'
import {VariableVM} from '../application/variable'

@Component({
  selector : 'is-modal-dialog-create-intercept',
  styleUrls: ['src/shared-styles/modal-dialog.css'],
  template : `
    <style>
      .buttons {
        position: absolute;
        bottom: 20px/*modalDialogComponentCssBodyPadding*/;
        right:  20px/*modalDialogComponentCssBodyPadding*/;
      }
    </style>

    <h2>{{'ModalDialogCreateIntercept.Header' | translate}}</h2>

    <div class="scrollable">
      <div class="fieldGroup">
        <label
          class="selectLabel"
          for  ="variable"
        >{{'Variable' | translate}}</label>
        <select
          id         ="variable"
          name       ="variable"
          [(ngModel)]="variable"
        >
          <option *ngFor="let v of variables" [attr.value]="v.id">{{v.key}}</option>
        </select>
      </div>
    
      <div class="fieldGroup">
        <label>{{'Value' | translate}}<input type="number" [(ngModel)]="value"></label>
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
export class ModalDialogCreateInterceptComponent extends AbstractComponent {

  variables: VariableVM[]
  variable: string // uuid
  value: number

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
      this.value = 0
      this.variable = variables[0].id
    })
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.projects.addIntercept(this.variable, this.value),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
