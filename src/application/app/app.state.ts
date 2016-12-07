import {State} from 'walts'

import {ViewName} from './app.routing'
import {ModalDialogParams} from '../../components/modal-dialog.component'
import {ProjectsRepository} from '../project'

export class AppState extends State {
  currentView?: ViewName
  modalDialog?: ModalDialogParams
  projects?: ProjectsRepository
  currentId?: string
  targetObservedVariableId?: string
  targetLatentVariableId?: string
}
