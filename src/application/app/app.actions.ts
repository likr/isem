import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {ViewName} from './app.routing'
import {AppState} from './app.state'

@Injectable()
export class AppActions extends Actions<AppState> {

  setCurrentView(name: ViewName): Action<AppState> {
    return (st) => {
      return {
        currentView: name
      } as AppState
    }
  }

}
