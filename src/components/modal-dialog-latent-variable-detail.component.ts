import {Component} from '@angular/core'

import {css as ModalDialogCss} from './modal-dialog.component'
import {AbstractComponent} from './abstract'
import {AppActions, AppDispatcher} from '../application/app'

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

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {
    super()
  }

  onClickPrimary() {
    this.dispatcher.emit(this.actions.closeModalDialog())
  }

}
