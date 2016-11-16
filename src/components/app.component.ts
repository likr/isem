import {Component} from '@angular/core'
import {Observable} from 'rxjs'

import {AbstractComponent} from './abstract'
import {DatabaseAdapter} from '../services'
import {AppStore} from '../application/app'
import {ModalDialogType} from './modal-dialog.component'

export const css = {
  height: '64px',
  padding: '8px'
}

@Component({
  selector: 'is-app',
  template: `
    <style>
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        color: #263238;
      }
      .header {
        position: relative;
        background-color: #455A64;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
        height: ${css.height};
        line-height: ${css.height};
        color: #FFFFFF;
      }
      h1 {
        padding-left: ${css.padding};
        font-size: 1.6em;
      }
    </style>
    <div class="header">
      <h1>{{'ApplicationName' | translate}}</h1>
    </div>
    
    <is-modal-dialog
      [type]     ="modalDialogType$ | async"
      [isVisible]="modalDialogIsVisible$ | async"
    ></is-modal-dialog>
    <router-outlet></router-outlet>
  `
})
export class AppComponent extends AbstractComponent {

  constructor(private database: DatabaseAdapter, // instantiate only
              private store: AppStore) {
    super()
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.observable.subscribe((st) => {
        console.info(st)
      })
    )
  }

  get modalDialogType$(): Observable<ModalDialogType> {
    return this.store.modalDialogType$
  }

  get modalDialogIsVisible$(): Observable<boolean> {
    return this.store.modalDialogIsVisible$
  }

}
