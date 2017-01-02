import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'

@Component({
  selector: 'is-modal-dialog-load-file',
  templateUrl: './modal-dialog-load-file.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-load-file.component.css'
  ]
})
export class ModalDialogLoadFileComponent extends AbstractComponent implements OnInit {

  private projectName: string
  private encodings: Array<{label: string, value: string}>
  private loadedCsv: string

  constructor(private projects: ProjectsActionsService,
              private modalDialog: ModalDialogActionsService,
              private dispatcher: AppDispatcherService) {
    super()
  }

  ngOnInit() {
    this.encodings = [
      {label: 'UTF-8',     value: 'utf8'},
      {label: 'Shift_JIS', value: 'sjis'}
    ]
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.projects.createNewProject(this.projectName, this.loadedCsv),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

  onResultInputFile(result: string) {
    this.loadedCsv = result
  }

}
