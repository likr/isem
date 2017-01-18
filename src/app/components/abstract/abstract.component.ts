import {OnDestroy} from '@angular/core'
import {Subscription} from 'rxjs'

export class AbstractComponent implements OnDestroy {

  protected subscriptions: Subscription[]

  constructor() {
    this.subscriptions = []
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}
