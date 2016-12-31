import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AbstractComponent} from './abstract'
import {ObservedVariableVM, LatentVariableVM} from '../application/variable'
import {AppActions, AppDispatcher, AppStore} from '../application/app'
import {ProjectsActions, ProjectsStore} from '../application/project'
import {ID} from '../application/app/app.routing'
import {Expression} from '../application/model/model-vm'

@Component({
  selector: 'is-detail',
  template: `
    <style>
      :host {
        display: flex;
        width: 100%;
        height: calc(100% - 64px/* appComponentCssHeight */);
      }
    </style>
    <is-variables
      [observedVariables]="observedVariables"
      [latentVariables]  ="latentVariables"
    ></is-variables>

    <is-models
      [covariances]            ="covariances"
      [intercepts]             ="intercepts"
      [latentVariableRelations]="latentVariableRelations"
      [regressions]            ="regressions"
    ></is-models>

    <is-viz
      [observedVariables]="observedVariables"
      [latentVariables]  ="latentVariables"
      [data]             ="data"
    ></is-viz>
  `
})
export class DetailComponent extends AbstractComponent {

  observedVariables:       ObservedVariableVM[]
  latentVariables:         LatentVariableVM[]
  covariances:             Expression[]
  intercepts:              Expression[]
  latentVariableRelations: Expression[]
  regressions:             Expression[]
  data:                    any

  constructor(private route: ActivatedRoute,
              private app: AppActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private projectsStore: ProjectsStore,
              private appStore: AppStore) {
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
