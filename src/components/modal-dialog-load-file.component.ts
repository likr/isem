import {Component} from '@angular/core'

import {css as ModalDialogCss} from './modal-dialog.component'
import {AbstractComponent} from './'
import {AppActions, AppDispatcher} from '../application/app'

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
    <input
      type="file"
      [encoding]="encoding"
      (result)="onResultInputFile($event)"
    >
    <label *ngFor="let item of items">
      <input
        type="radio"
        name="encoding"
        [attr.value]="item.value"
        [checked]="item.value === items[0].value"
        (change)="encoding = item.value"
      >
      {{item.label}}
    </label>
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
export class ModalDialogLoadFileComponent extends AbstractComponent {

  private projectName: string
  private items: Array<{label: string, value: string}>
  private loadedCsv: string

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {
    super()
  }

  ngOnInit() {
    this.items = [
      {label: 'UTF-8',     value: 'utf8'},
      {label: 'Shift_JIS', value: 'sjis'}
    ]
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.actions.createNewProject(this.projectName, this.loadedCsv),
      this.actions.closeModalDialog()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.actions.closeModalDialog())
  }

  onResultInputFile(result: string) {
    this.loadedCsv = result
  }

}
