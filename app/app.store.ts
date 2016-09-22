import {Injectable} from '@angular/core';
import {State, Store} from 'walts';

import {ViewName} from './app.routing';
import {AppDispatcher} from './app.dispatcher';

export class AppState extends State {
  currentView: ViewName;
}

const INIT_STATE: AppState = {
  currentView: void 0
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(protected dispatcher: AppDispatcher) {
    super(INIT_STATE, dispatcher);
  }

}