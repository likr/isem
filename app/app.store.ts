import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {State, Store} from 'walts'

import {ViewName} from './app.routing'
import {AppDispatcher} from './app.dispatcher'
import {ModalDialogParams} from './modal-dialog.component'

export class AppState extends State {
  currentView?: ViewName
  modalDialog?: ModalDialogParams
}

const INIT_STATE: AppState = {
  currentView: void 0,
  modalDialog: {
    isVisible: false
  }
}

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(protected dispatcher: AppDispatcher) {
    super(INIT_STATE, dispatcher)
  }

  getModalDialogParams(): Observable<ModalDialogParams> {
    return this.observable.map((st) => {
      return st.modalDialog
    })
  }
}
