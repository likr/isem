import {Injectable} from '@angular/core';
import {Actions, Action} from 'walts';

import {AppState} from './app.store';

@Injectable()
export class AppActions extends Actions<AppState> {

  constructor() {
    super();
  }

}