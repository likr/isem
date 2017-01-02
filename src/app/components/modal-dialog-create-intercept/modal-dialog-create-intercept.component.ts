import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {VariableVm} from '../../application/variable/variable-vm'

@Component({
  selector: 'is-modal-dialog-create-intercept',
  templateUrl: './modal-dialog-create-intercept.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-create-intercept.component.css'
  ]
})
export class ModalDialogCreateInterceptComponent extends AbstractComponent implements OnInit {

  variables: VariableVm[]
  variable: string // uuid
  value: number

  constructor(private modalDialog: ModalDialogActionsService,
              private projects: ProjectsActionsService,
              private dispatcher: AppDispatcherService,
              private store: ProjectsStoreService) {
    super()
  }

  ngOnInit() {
    const p = new Promise<VariableVm[]>((resolve) => {
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
