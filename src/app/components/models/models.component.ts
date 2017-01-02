import {Component, OnInit, Input} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'

@Component({
  selector: 'is-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent extends AbstractComponent implements OnInit {

  @Input() covariances:             string[]
  @Input() intercepts:              string[]
  @Input() latentVariableRelations: string[]
  @Input() regressions:             string[]

  constructor(private modalDialog: ModalDialogActionsService,
              private projects: ProjectsActionsService,
              private dispatcher: AppDispatcherService) {
    super()
  }

  ngOnInit() {}

  onClickRegression() {
    this.dispatcher.emit(this.modalDialog.openCreateRegression())
  }

  onClickLatentVariableRelation() {
    this.dispatcher.emit(this.modalDialog.openCreateLatentVariableRelation())
  }

  onClickCovariance() {
    this.dispatcher.emit(this.modalDialog.openCreateCovariance())
  }

  onClickIntercept() {
    this.dispatcher.emit(this.modalDialog.openCreateIntercept())
  }

  onClickRemoveRegression(id: string) {
    this.dispatcher.emit(this.projects.removeRegression(id))
  }

  onClickRemoveLatentVariableRelation(id: string) {
    this.dispatcher.emit(this.projects.removeLatentVariableRelation(id))
  }

  onClickRemoveCovariance(id: string) {
    this.dispatcher.emit(this.projects.removeCovariance(id))
  }

  onClickRemoveIntercept(id: string) {
    this.dispatcher.emit(this.projects.removeIntercept(id))
  }

}
