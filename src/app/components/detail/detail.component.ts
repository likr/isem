import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AbstractComponent} from '../abstract/abstract.component'
import {ObservedVariableVm} from '../../application/variable/observed-variable-vm'
import {LatentVariableVm} from '../../application/variable/latent-variable-vm'
import {Expression} from '../../application/model/model-vm'
import {AppActionsService} from '../../app-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {AppStoreService} from '../../app-store.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {ID} from '../../app-routing'

@Component({
  selector: 'is-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends AbstractComponent implements OnInit {

  observedVariables:       ObservedVariableVm[]
  latentVariables:         LatentVariableVm[]
  covariances:             Expression[]
  intercepts:              Expression[]
  latentVariableRelations: Expression[]
  regressions:             Expression[]
  data:                    any

  constructor(private route: ActivatedRoute,
              private app: AppActionsService,
              private projects: ProjectsActionsService,
              private dispatcher: AppDispatcherService,
              private projectsStore: ProjectsStoreService,
              private appStore: AppStoreService) {
    super()
  }

  ngOnInit() {
    this.subscriptions = this.subscriptions.concat([
      this.projectsStore.observedVariables$      .subscribe((v) => this.observedVariables = v),
      this.projectsStore.latentVariables$        .subscribe((v) => this.latentVariables = v),
      this.projectsStore.covariances$            .subscribe((v) => this.covariances = v),
      this.projectsStore.intercepts$             .subscribe((v) => this.intercepts = v),
      this.projectsStore.latentVariableRelations$.subscribe((v) => this.latentVariableRelations = v),
      this.projectsStore.regressions$            .subscribe((v) => this.regressions = v),
      this.appStore.data$                        .subscribe((v) => this.data = v),
    ])

    this.subscriptions.push(
      this.route.params.map((v) => v[ID]).subscribe((id) => {
        this.dispatcher.emitAll([
          this.projects.initDetail(id),
          this.app.setCurrentView('detail'),
        ])
      })
    )

    this.dispatcher.emit(this.projects.calcSem())
  }

}
