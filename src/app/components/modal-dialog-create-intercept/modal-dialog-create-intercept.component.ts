import {AfterViewInit, Component, OnInit} from '@angular/core'
import * as jQuery from 'jquery'

import {AbstractComponent} from '../abstract/abstract.component'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {VariableVm} from '../../application/variable/variable-vm'

const renderSemanticUi = () => {
  const checkbox = jQuery('.ui.checkbox') as any
  const dropdown = jQuery('.ui.dropdown') as any
  checkbox.checkbox()
  dropdown.dropdown()
}

@Component({
  selector: 'is-modal-dialog-create-intercept',
  templateUrl: './modal-dialog-create-intercept.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-create-intercept.component.css'
  ]
})
export class ModalDialogCreateInterceptComponent
  extends AbstractComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit() {
    renderSemanticUi()
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
