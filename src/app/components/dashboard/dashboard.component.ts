import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'
import {ProjectVm} from '../../application/project/project-vm'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {AppActionsService} from '../../app-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'

@Component({
  selector: 'is-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AbstractComponent implements OnInit {

  projectVMs: ProjectVm[]

  constructor(private appActions: AppActionsService,
              private projects: ProjectsActionsService,
              private modalDialog: ModalDialogActionsService,
              private dispatcher: AppDispatcherService,
              private store: ProjectsStoreService) {
    super()
    this.projectVMs = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.allProjects$.subscribe((v) => {
        this.projectVMs = v
      })
    )
    this.dispatcher.emit(this.appActions.setCurrentView('dashboard'))
  }

  onClickLoadFile() {
    this.dispatcher.emit(this.modalDialog.openLoadFile())
  }

  onClickProject(project: ProjectVm) {
    this.dispatcher.emit(this.projects.showDetail(project))
  }

  onClickDelete(ev: MouseEvent, project: ProjectVm) {
    ev.stopPropagation()
    this.dispatcher.emit(this.projects.deleteProject(project))
  }

}
