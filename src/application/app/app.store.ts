import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from 'walts'

import {AppDispatcher} from './app.dispatcher'
import {AppState} from './app.state'
import {ModalDialogType} from '../../components/modal-dialog.component'
import {ProjectsRepository} from '../project/projects.repository'

const INIT_STATE: AppState = {
  currentView: void 0,
  modalDialog: {
    type     : void 0,
    isVisible: false
  },
  projects   : void 0,
  currentId  : '',
  data: {}
}

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(protected dispatcher: AppDispatcher,
              private projectsRepository: ProjectsRepository) {
    super((() => {
      INIT_STATE.projects = projectsRepository
      return INIT_STATE
    })(), dispatcher)
  }

  get modalDialogIsVisible$(): Observable<boolean> {
    return this.observable.map((st) => st.modalDialog.isVisible)
  }

  get modalDialogType$(): Observable<ModalDialogType> {
    return this.observable.map((st) => st.modalDialog.type)
  }

  get data$(): Observable<any> {
    return this.observable.map((st) => st.data)
  }
}
