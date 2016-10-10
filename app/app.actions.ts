import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {ViewName} from './app.routing'
import {AppState} from './app.store'

@Injectable()
export class AppActions extends Actions<AppState> {

  constructor() {
    super()
  }

  example(): Action<AppState> {
    return (st) => {
      console.info('do it!')
      return st
    }
  }

  setCurrentView(name: ViewName): Action<AppState> {
    return (st) => {
      return {
        currentView: name
      } as AppState
    }
  }

  openModalDialodLoadFile(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'loadFile',
          isVisible: true
        }
      } as AppState
    }
  }

  closeModalDialog(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: null,
          isVisible: false
        }
      } as AppState
    }
  }

  createNewProject(modelCsv: string): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.create(modelCsv).then(() => {
          apply((_st) => _st)
        })
      })
    }
  }

}
