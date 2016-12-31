import {Component} from '@angular/core'

import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsStore} from '../application/project'
import {ObservedVariableVM} from '../application/variable'

@Component({
  selector : 'is-modal-dialog-observed-variable-detail',
  styleUrls: ['src/shared-styles/modal-dialog.css'],
  template : `
    <style>
      .buttons {
        position: absolute;
        bottom: 20px/*modalDialogComponentCssBodyPadding*/;
        right:  20px/*modalDialogComponentCssBodyPadding*/;
      }
    </style>

    <h2>{{'ModalDialogObservedVariableDetail.Header' | translate}}</h2>
    <p>{{variable.key}}</p>
    
    <div class="buttons">
      <is-ui-button
        [label]="'OK' | translate"
        [type] ="'primary'"
        (clickButton)="onClickPrimary($event)"
      ></is-ui-button>
    </div>
  `
})
export class ModalDialogObservedVariableDetailComponent extends AbstractComponent {

  private variable: ObservedVariableVM

  constructor(private modalDialog: ModalDialogActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.currentObservedVariable$.subscribe((v) => this.variable = v)
    )
  }

  onClickPrimary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
