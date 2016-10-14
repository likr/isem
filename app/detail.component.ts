import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Subscription} from 'rxjs'

import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'
import {AppStore} from './app.store'
import {ID} from './app.routing'

@Component({
  selector: 'is-detail',
  template: `
    detail
  `
})
export class DetailComponent {

  private subscriptions: Subscription[]

  constructor(private route: ActivatedRoute,
              private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: AppStore) {
    this.subscriptions = []
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

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}
