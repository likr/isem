import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AppActions} from '../app.actions'
import {AppDispatcher} from '../app.dispatcher'
import {AppStore} from '../app.store'
import {ID} from '../app.routing'
import {AbstractComponent} from './abstract.component'

@Component({
  selector: 'is-detail',
  template: `
    detail
  `
})
export class DetailComponent extends AbstractComponent {

  constructor(private route: ActivatedRoute,
              private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: AppStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.currentProject$.subscribe((v) => {
        console.log(v)
      })
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
