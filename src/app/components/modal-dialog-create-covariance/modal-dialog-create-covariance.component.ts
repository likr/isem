import {AfterViewInit, Component, OnInit} from '@angular/core'

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
  selector: 'is-modal-dialog-create-covariance',
  templateUrl: './modal-dialog-create-covariance.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-create-covariance.component.css'
  ]
})
export class ModalDialogCreateCovarianceComponent
  extends AbstractComponent implements OnInit, AfterViewInit {

  variables: VariableVm[]
  variable1: string // uuid
  variable2: string // uuid

  constructor(private modalDialog: ModalDialogActionsService,
              private projects: ProjectsActionsService,
              private dispatcher: AppDispatcherService,
              private store: ProjectsStoreService) {
    super()
  }

  ngOnInit() {
    const setVariables = (v: VariableVm[]) => {
      this.variables = v
    }

    this.subscriptions.push(
      this.store.variables$.skip(1).subscribe((v) => {
        setVariables(v)
      })
    )

    this.subscriptions.push(
      this.store.variables$.take(1).subscribe((v) => {
        setVariables(v)
        this.variable1 = v[0].id
        this.variable2 = 1 < v.length ? v[1].id : v[0].id
      })
    )
  }

  ngAfterViewInit() {
    renderSemanticUi()
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.projects.addCovariance(this.variable1, this.variable2),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
