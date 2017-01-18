import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {ObservedVariableVm} from '../../application/variable/observed-variable-vm'

@Component({
  selector: 'is-modal-dialog-observed-variable-detail',
  templateUrl: './modal-dialog-observed-variable-detail.component.html',
  styleUrls: [
    '../../../assets/shared-styles/modal-dialog.css',
    './modal-dialog-observed-variable-detail.component.css'
  ]
})
export class ModalDialogObservedVariableDetailComponent extends AbstractComponent implements OnInit {

  variable: ObservedVariableVm

  constructor(private modalDialog: ModalDialogActionsService,
              private dispatcher: AppDispatcherService,
              private store: ProjectsStoreService) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.currentObservedVariable$.subscribe((v) => this.variable = v)
    )
  }

  onClickPrimary() {
    this.dispatcher.emit(this.modalDialog.close())
  }

}
