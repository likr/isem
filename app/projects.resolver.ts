import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AppActions} from './app.actions';
import {AppDispatcher} from './app.dispatcher';

export class ProjectsResolver implements Resolve<any> {

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Promise<boolean> {
    this.dispatcher.emit(this.actions.example());
    return Promise.resolve(true);
  }

}