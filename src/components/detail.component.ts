import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AbstractComponent} from './abstract'
import {ObservedVariableVM, LatentVariableVM} from '../application/variable'
import {AppActions, AppDispatcher} from '../application/app'
import {ProjectsStore} from '../application/project'
import {ID} from '../application/app/app.routing'

@Component({
  selector: 'is-detail',
  template: `
    <is-variables
      [observedVariables]="observedVariables"
      [latentVariables]  ="latentVariables"
    ></is-variables>
  `
})
export class DetailComponent extends AbstractComponent {

  observedVariables: ObservedVariableVM[]
  latentVariables: LatentVariableVM[]

  constructor(private route: ActivatedRoute,
              private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.observedVariables$.subscribe((v) => this.observedVariables = v )
    )
    this.subscriptions.push(
      this.store.latentVariables$.subscribe((v) => this.latentVariables = v)
    )
    this.subscriptions.push(
      this.route.params.map((v) => v[ID]).subscribe((id) => {
        this.dispatcher.emitAll([
          this.actions.initDetail(id),
          this.actions.setCurrentView('detail'),
        ])
      })
    )
  }

}
