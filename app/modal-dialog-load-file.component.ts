import {Component} from '@angular/core'

import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'

@Component({
  selector: 'is-modal-dialog-load-file',
  template: `
    <style></style>
    <h2>{{'ModalDialogLoadFile.Header' | translate}}</h2>
    <label for="projectName">{{'ModalDialogLoadFile.LabelProjectName' | translate}}</label>
    <input type="text" id="projectName" [(ngModel)]="projectName">
    <label for="csvFile">{{'ModalDialogLoadFile.LabelCSVFile' | translate}}</label>
    <p>{{'ModalDialogLoadFile.SampleFile' | translate}}</p>
  `
})
export class ModalDialogLoadFileComponent {

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {}

}
