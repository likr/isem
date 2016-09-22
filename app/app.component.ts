import {Component} from '@angular/core';

import {AppStore} from './app.store';

@Component({
  selector: 'is-app',
  template: `
    <style>
      .header {
        background-color: #455A64;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
        height: 64px;
        line-height: 64px;
        color: #FFFFFF;
      }
    </style>
    <div class="header">
      <h1>{{'ApplicationName' | translate}}</h1>
    </div>
    
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(private store: AppStore) {
    this.store.observable.subscribe((st) => {
      console.log(st);
    });
  }

}
