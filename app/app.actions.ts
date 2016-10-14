import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {ViewName} from './app.routing'
import {AppState} from './app.store'
import {WindowRef} from './window-ref.service'
import {ProjectVM} from './application/view-model/project-vm'
import {RouteChanger} from './route-changer.service'

@Injectable()
export class AppActions extends Actions<AppState> {

  private window: Window

  constructor(private routeChanger: RouteChanger,
              windowRef: WindowRef) {
    super()
    this.window = windowRef.nativeWindow
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

  createNewProject(projectName: string, modelCsv: string): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.create(projectName, modelCsv).then(() => {
          apply((_st) => _st)
        })
      })
    }
  }

  showDetail(project: ProjectVM): Action<AppState> {
    return (st) => {
      this.routeChanger.toDetail(project.uuid)
      return st
    }
  }

  initDetail(uuid: string): Action<AppState> {
    return (st) => {
      st.projects.emitQuerySingle(uuid)
      return {
        currentId: uuid
      } as AppState
    }
  }

  deleteProject(project: ProjectVM): Action<AppState> {
    return (st) => {
      const confirmed = this.window.confirm('Are you sure?')
      if (!confirmed) {
        return st
      }
      return this.delayed((apply) => {
        st.projects.delete(project.uuid).then(() => {
          apply((_st) => _st)
        })
      })
    }
  }

}
