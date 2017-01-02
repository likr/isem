import {State} from 'walts'

import {ViewName} from './app-routing'
import {ModalDialogParams} from './components/modal-dialog/modal-dialog.component'
import {ProjectsRepositoryService} from './application/project/projects-repository.service'

export class AppState extends State {
  currentView?: ViewName
  modalDialog?: ModalDialogParams
  projects?: ProjectsRepositoryService
  currentId?: string
  targetObservedVariableId?: string
  targetLatentVariableId?: string
  data?: any
}
