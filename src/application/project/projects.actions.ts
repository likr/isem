import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {AppState} from '../app/app.state'
import {RouteChanger, WindowRef} from '../../services'
import {ProjectVM} from '../project'
import {LatentVariableVM} from '../variable'

@Injectable()
export class ProjectsActions extends Actions<AppState> {

  private window: Window

  constructor(private routeChanger: RouteChanger,
              windowRef: WindowRef) {
    super()
    this.window = windowRef.nativeWindow
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

  addLatentVariable(): Action<AppState> {
    return (st) => {
      st.projects.addLatentVariable(st.currentId)
      return st
    }
  }

  removeLatentVariable(variable: LatentVariableVM): Action<AppState> {
    return (st) => {
      st.projects.removeLatentVariable(st.currentId, variable.id)
      return st
    }
  }

  changeLatentVariableKey(variable: LatentVariableVM, newKey: string): Action<AppState> {
    return (st) => {
      st.projects.changeLatentVariableKey(st.currentId, variable.id, newKey)
      return st
    }
  }

}
