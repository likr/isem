import {Injectable} from '@angular/core';
import {Actions, Action} from 'walts';

import {ViewName} from './app.routing';
import {AppState} from './app.store';

@Injectable()
export class AppActions extends Actions<AppState> {

  constructor() {
    super();
  }

  setCurrentView(name: ViewName): Action<AppState> {
    return (st) => {
      return {
        currentView: name
      };
    };
  }

  openModalDialodLoadFile(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          isVisible: true
        }
      };
    };
  }

  closeModalDialog(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          isVisible: false
        }
      };
    };
  }

}
