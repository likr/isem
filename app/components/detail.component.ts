import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AppActions} from '../app.actions'
import {AppDispatcher} from '../app.dispatcher'
import {ProjectsStore} from '../application/project/projects.store'
import {ID} from '../app.routing'
import {AbstractComponent} from './abstract.component'
import {ObservedVariableVM} from '../application/variable/observed-variable-vm'
import {LatentVariableVM} from '../application/variable/latent-variable-vm'

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
