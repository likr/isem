import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {LatentVariableVm} from '../../application/variable/latent-variable-vm'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'

@Component({
  selector: 'is-modal-dialog-latent-variable-detail',
  templateUrl: './modal-dialog-latent-variable-detail.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-latent-variable-detail.component.css'
  ]
})
export class ModalDialogLatentVariableDetailComponent extends AbstractComponent implements OnInit {

  variable: LatentVariableVm
  newKey: string

  constructor(private modalDialog: ModalDialogActionsService,
              private projects: ProjectsActionsService,
              private dispatcher: AppDispatcherService,
              private store: ProjectsStoreService) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.currentLatentVariable$.subscribe((v) => {
        this.variable = v
        this.newKey   = this.variable.key
      })
    )
  }

  onClickRemove() {
    this.dispatcher.emitAll([
      this.projects.removeLatentVariable(this.variable),
      this.modalDialog.close()
    ])
  }

  onClickPrimary() {
    this.dispatcher.emitAll([
      this.projects.changeLatentVariableKey(this.variable, this.newKey),
      this.modalDialog.close()
    ])
  }

  onClickSecondary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
