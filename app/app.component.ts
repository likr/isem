import {Component} from '@angular/core'

import {AppStore} from './app.store'
import {DatabaseAdapter} from './database.adapter'

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
    
    <is-modal-dialog
      [type]     ="modalDialogType | async"
      [isVisible]="modalDialogIsVisible | async"
    ></is-modal-dialog>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(private database: DatabaseAdapter, // instantiate only
              private store: AppStore) {
    this.store.observable.subscribe((st) => {
      console.log(st)
    })
  }

  get modalDialogType() {
    return this.store.getModalDialogType()
  }

  get modalDialogIsVisible() {
    return this.store.getModalDialogIsVisible()
  }

}
