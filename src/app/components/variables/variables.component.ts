import {Component, OnInit, Input} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {ObservedVariableVm} from '../../application/variable/observed-variable-vm'
import {LatentVariableVm} from '../../application/variable/latent-variable-vm'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'

@Component({
  selector: 'is-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent extends AbstractComponent implements OnInit {

  @Input() observedVariables: ObservedVariableVm[]
  @Input() latentVariables: LatentVariableVm[]

  constructor(private projects: ProjectsActionsService,
              private modalDialog: ModalDialogActionsService,
              private dispatcher: AppDispatcherService) {
    super()
  }

  ngOnInit() {}

  onClickAddLatentVariable() {
    this.dispatcher.emit(this.projects.addLatentVariable())
  }

  onClickObservedVariable(v: ObservedVariableVm) {
    this.dispatcher.emit(this.modalDialog.openObservedVariableDetail(v))
  }

  onClickLatentVariable(v: LatentVariableVm) {
    this.dispatcher.emit(this.modalDialog.openLatentVariableDetail(v))
  }

}
