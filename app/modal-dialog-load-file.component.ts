import {Component} from '@angular/core'

import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'
import {css as ModalDialogCss} from './modal-dialog.component'

@Component({
  selector: 'is-modal-dialog-load-file',
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

    <h2>{{'ModalDialogLoadFile.Header' | translate}}</h2>

    <label for="projectName">{{'ModalDialogLoadFile.LabelProjectName' | translate}}</label>
    <input type="text" id="projectName" [(ngModel)]="projectName">

    <label for="csvFile">{{'ModalDialogLoadFile.LabelCSVFile' | translate}}</label>
    <p>{{'ModalDialogLoadFile.SampleFile' | translate}}</p>
    
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
export class ModalDialogLoadFileComponent {

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {}

  onClickPrimary() {
    console.log('onClickPrimary')
  }

  onClickSecondary() {
    this.dispatcher.emit(this.actions.closeModalDialog())
  }

}
