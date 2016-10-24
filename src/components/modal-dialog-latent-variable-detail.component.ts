import {Component} from '@angular/core'

import {css as ModalDialogCss} from './modal-dialog.component'
import {AbstractComponent} from './abstract'
import {AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsStore} from '../application/project'
import {LatentVariableVM} from '../application/variable'

@Component({
  selector: 'is-modal-dialog-latent-variable-detail',
  template: `
    <style>
      .buttons {
        position: absolute;
        bottom: ${ModalDialogCss.bodyPadding};
        right:  ${ModalDialogCss.bodyPadding};
      }  
        
      is-ui-button {
        margin-right: 5px; 
      }
      is-ui-button:last-child {
        margin-right: 0; 
      }
    </style>

    <h2>ModalDialogLatentVariableDetail</h2>
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
export class ModalDialogLatentVariableDetail extends AbstractComponent {

  private variable: LatentVariableVM

  constructor(private modalDialog: ModalDialogActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.currentLatentVariable$.subscribe((v) => this.variable = v)
    )
  }

  onClickPrimary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
