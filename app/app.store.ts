import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {State, Store} from 'walts'

import {AppDispatcher} from './app.dispatcher'
import {ViewName} from './app.routing'
import {ModalDialogParams, ModalDialogType} from './components/modal-dialog.component'
import {ProjectsRepository} from './application/project/projects.repository'

export class AppState extends State {
  currentView?: ViewName
  modalDialog?: ModalDialogParams
  projects?: ProjectsRepository
  currentId?: string
}

const INIT_STATE: AppState = {
  currentView: void 0,
  modalDialog: {
    type: void 0,
    isVisible: false
  },
  projects: void 0,
  currentId: ''
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
    return this.observable.map((st) => {
      return st.modalDialog.isVisible
    })
  }

  get modalDialogType$(): Observable<ModalDialogType> {
    return this.observable.map((st) => {
      return st.modalDialog.type
    })
  }
}
