import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {State, Store} from 'walts'

import {AppDispatcher} from './app.dispatcher'
import {ViewName} from './app.routing'
import {ModalDialogParams, ModalDialogType} from './components/modal-dialog.component'
import {ProjectsRepository} from './application/project/projects.repository'
import {ProjectVM} from './application/project/project-vm'
import {ProjectVMFactory} from './application/project/project-vm-factory'
import {ObservedVariableVM} from './application/variable/observed-variable-vm'

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
              private projectsRepository: ProjectsRepository,
              private projectVMFactory: ProjectVMFactory) {
    super((() => {
      INIT_STATE.projects = projectsRepository
      return INIT_STATE
    })(), dispatcher)
  }

  get allProjects$(): Observable<ProjectVM[]> {
    return this.projectsRepository.all$.map((projects) => {
      return this.projectVMFactory.makeFromProjects(projects)
    })
  }

  get currentProject$(): Observable<ProjectVM> {
    return this.projectsRepository.single$.map((project) => {
      return this.projectVMFactory.make(project)
    })
  }

  get observedVariables$(): Observable<ObservedVariableVM[]> {
    return this.currentProject$.map((project) => {
      return project.observedVariables
    })
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
