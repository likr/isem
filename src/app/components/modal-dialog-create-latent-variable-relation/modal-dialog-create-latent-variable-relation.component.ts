import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {ObservedVariableVm} from '../../application/variable/observed-variable-vm'
import {LatentVariableVm} from '../../application/variable/latent-variable-vm'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'

@Component({
  selector: 'is-modal-dialog-create-latent-variable-relation',
  templateUrl: './modal-dialog-create-latent-variable-relation.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-create-latent-variable-relation.component.css'
  ]
})
export class ModalDialogCreateLatentVariableRelationComponent extends AbstractComponent implements OnInit {

  observedVariables: ObservedVariableVm[]
  latentVariables: LatentVariableVm[]
  latentVariable: string // uuid
  checkboxModel: boolean[]

  constructor(private modalDialog: ModalDialogActionsService,
              private projects: ProjectsActionsService,
              private dispatcher: AppDispatcherService,
              private store: ProjectsStoreService) {
    super()
    this.checkboxModel = []
  }

  ngOnInit() {
    const p1 = new Promise((resolve) => {
      this.subscriptions.push(
        this.store.observedVariables$.subscribe((v) => {
          this.observedVariables = v
          resolve()
        })
      )
    })
    p1.then(() => {
      this.checkboxModel = this.observedVariables.map((_) => false)
    })

    const p2 = new Promise<LatentVariableVm[]>((resolve) => {
      this.subscriptions.push(
        this.store.latentVariables$.subscribe((v) => {
          this.latentVariables = v
          resolve(v)
        })
      )
    })
    p2.then((v) => {
      this.latentVariable = v[0].id
    })
  }

  onClickPrimary() {
    const observedVariableIds = this.checkboxModel.map((v, i) => {
      if (v) {
        return this.observedVariables[i].id
      }
    }).filter((v) => !!v)

    this.dispatcher.emitAll([
      this.projects.addLatentVariableRelation(this.latentVariable, observedVariableIds),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
