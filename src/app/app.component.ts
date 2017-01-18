import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'

import {AbstractComponent} from './components/abstract/abstract.component'
import {DatabaseAdapterService} from './services/database-adapter.service'
import {AppStoreService} from './app-store.service'
import {ModalDialogType} from './components/modal-dialog/modal-dialog.component'

@Component({
  selector: 'is-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractComponent implements OnInit {

  constructor(private database: DatabaseAdapterService, // instantiate only
              private store: AppStoreService) {
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
