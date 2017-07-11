import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from 'walts'

import {AppDispatcherService} from './app-dispatcher.service'
import {AppState} from './app-state'
import {ModalDialogType} from './components/modal-dialog/modal-dialog.component'
import {ProjectsRepositoryService} from './application/project/projects-repository.service'

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
export class AppStoreService extends Store<AppState> {

  constructor(protected dispatcher: AppDispatcherService,
              private projectsRepository: ProjectsRepositoryService) {
    super((() => {
      INIT_STATE.projects = projectsRepository
      return INIT_STATE
    })(), dispatcher)
  }

  get modalDialogIsVisible$(): Observable<boolean> {
    return this.observable.map((st) => st.modalDialog.isVisible) as any // XXX
  }

  get modalDialogType$(): Observable<ModalDialogType> {
    return this.observable.map((st) => st.modalDialog.type) as any // XXX
  }

  get data$(): Observable<any> {
    return this.observable.map((st) => st.data) as any // XXX
  }
}
