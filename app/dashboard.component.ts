import {Component} from '@angular/core';

import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';

@Component({
  selector: 'is-dashboard',
  template: `
    <div>
      <h2>{{'CreateNewProject' | translate}}</h2>
      <is-ui-button
        [label]="'LoadFile' | translate"
        [type] ="'primary'"
        (clickButton)="onClickLoadFile($event)"
      ></is-ui-button>
    </div>
    
    <div>
      <h2>{{'ProjectList' | translate}}</h2>
    </div>
  `
})
export class DashboardComponent {

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {}

  ngOnInit() {
    this.dispatcher.emit(this.actions.setCurrentView('dashboard'));
  }

  onClickLoadFile() {
    console.info('onClickLoadFile');
  }

}
