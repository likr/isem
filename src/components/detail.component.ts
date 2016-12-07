import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AbstractComponent} from './abstract'
import {css as appCss} from './app.component'
import {ObservedVariableVM, LatentVariableVM} from '../application/variable'
import {AppActions, AppDispatcher} from '../application/app'
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
        height: calc(100% - ${appCss.height});
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
  `
})
export class DetailComponent extends AbstractComponent {

  observedVariables:       ObservedVariableVM[]
  latentVariables:         LatentVariableVM[]
  covariances:             Expression[]
  intercepts:              Expression[]
  latentVariableRelations: Expression[]
  regressions:             Expression[]

  constructor(private route: ActivatedRoute,
              private app: AppActions,
              private projects: ProjectsActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.concat([
      this.store.observedVariables$      .subscribe((v) => this.observedVariables = v),
      this.store.latentVariables$        .subscribe((v) => this.latentVariables = v),
      this.store.covariances$            .subscribe((v) => this.covariances = v),
      this.store.intercepts$             .subscribe((v) => this.intercepts = v),
      this.store.latentVariableRelations$.subscribe((v) => this.latentVariableRelations = v),
      this.store.regressions$            .subscribe((v) => this.regressions = v),
    ])

    this.subscriptions.push(
      this.route.params.map((v) => v[ID]).subscribe((id) => {
        this.dispatcher.emitAll([
          this.projects.initDetail(id),
          this.app.setCurrentView('detail'),
        ])
      })
    )
  }

}
