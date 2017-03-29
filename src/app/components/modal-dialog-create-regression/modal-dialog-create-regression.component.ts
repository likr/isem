import {AfterViewInit, Component, OnInit} from '@angular/core'
import * as jQuery from 'jquery'

import {AbstractComponent} from '../abstract/abstract.component'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {VariableVm} from '../../application/variable/variable-vm'

const renderSemanticUi = () => {
  const checkbox = jQuery('.ui.checkbox') as any
  const dropdown = jQuery('.ui.dropdown') as any
  checkbox.checkbox()
  dropdown.dropdown()
}

@Component({
  selector: 'is-modal-dialog-create-regression',
  templateUrl: './modal-dialog-create-regression.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-create-regression.component.css'
  ]
})
export class ModalDialogCreateRegressionComponent
  extends AbstractComponent implements OnInit, AfterViewInit {

  variables: VariableVm[]
  dependentVariable: string // uuid
  checkboxModel: boolean[]

  constructor(private modalDialog: ModalDialogActionsService,
              private projects: ProjectsActionsService,
              private dispatcher: AppDispatcherService,
              private store: ProjectsStoreService) {
    super()
    this.checkboxModel = []
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
    p.then((v) => {
      this.checkboxModel = this.variables.map((_) => false)
      this.dependentVariable = v[0].id
    })
  }

  ngAfterViewInit() {
    renderSemanticUi()
  }

  onClickPrimary() {
    const variableIds = this.checkboxModel.map((v, i) => {
      if (v) {
        return this.variables[i].id
      }
    }).filter((v) => !!v)

    this.dispatcher.emitAll([
      this.projects.addRegression(this.dependentVariable, variableIds),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
