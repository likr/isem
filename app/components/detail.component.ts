import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AppActions} from '../app.actions'
import {AppDispatcher} from '../app.dispatcher'
import {AppStore} from '../app.store'
import {ID} from '../app.routing'
import {AbstractComponent} from './abstract.component'
import {ObservedVariableVM} from '../application/variable/observed-variable-vm'

@Component({
  selector: 'is-detail',
  template: `
    <ul>
      <li *ngFor="let variable of observedVariables">
        {{variable.key}}
      </li>
    </ul>
  `
})
export class DetailComponent extends AbstractComponent {

  observedVariables: ObservedVariableVM[]

  constructor(private route: ActivatedRoute,
              private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: AppStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.observedVariables$.subscribe((v) => this.observedVariables = v)
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
