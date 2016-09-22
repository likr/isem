import {Component} from '@angular/core';

import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';

@Component({
  selector: 'is-detail',
  template: `
    detail
  `
})
export class DetailComponent {

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {}

  ngOnInit() {
    this.dispatcher.emit(this.actions.setCurrentView('detail'));
  }

}
