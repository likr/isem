import {Component} from '@angular/core'

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
        bottom: var(--is-modal-dialog-padding);
        right:  var(--is-modal-dialog-padding);
      }
    </style>

    <h2>{{'ModalDialogCreateLatentVariableRelation.Header' | translate}}</h2>

    <div class="scrollable">
      <div class="fieldGroup">
        <label
          class="selectLabel"
          for  ="latentVariable"
        >{{'LatentVariable' | translate}}</label>
        <select
          id         ="latentVariable"
          name       ="latentVariable"
          [(ngModel)]="latentVariable"
        >
          <option *ngFor="let v of latentVariables" [attr.value]="v.id">{{v.key}}</option>
        </select>
      </div>
  
      <div class="fieldGroup">
        <label
          *ngFor="let v of observedVariables; let i = index"
          class ="checkboxLabel"
        >
          <input
            type       ="checkbox"
            name       ="observedVariable"
            [(ngModel)]="checkboxModel[i]"
          >{{v.key}}
        </label>
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
export class ModalDialogCreateLatentVariableRelationComponent extends AbstractComponent {

  observedVariables: ObservedVariableVM[]
  latentVariables: LatentVariableVM[]
  latentVariable: string // uuid
  checkboxModel: boolean[]

  constructor(private modalDialog: ModalDialogActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
    this.checkboxModel = []
  }

  ngOnInit() {
    const p1 = new Promise((resolve) => {
      this.subscriptions.push(
        this.store.observedVariables$.subscribe((v) => {
          this.observedVariables = v
          resolve()
        })
      )
    })
    p1.then(() => {
      this.checkboxModel = this.observedVariables.map((_) => false)
    })

    const p2 = new Promise<LatentVariableVM[]>((resolve) => {
      this.subscriptions.push(
        this.store.latentVariables$.subscribe((v) => {
          this.latentVariables = v
          resolve(v)
        })
      )
    })
    p2.then((v) => {
      this.latentVariable = v[0].id
    })
  }

  onClickPrimary() {
    const observedVariableIds = this.checkboxModel.map((v, i) => {
      if (v) {
        return this.observedVariables[i].id
      }
    }).filter((v) => !!v)

    this.dispatcher.emitAll([
      this.projects.addLatentVariableRelation(this.latentVariable, observedVariableIds),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
