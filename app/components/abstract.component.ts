import {Subscription} from 'rxjs'

export class AbstractComponent {

  protected subscriptions: Subscription[]

  constructor() {
    this.subscriptions = []
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}