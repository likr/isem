import {Injectable} from '@angular/core'
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'

import {ProjectVM, ProjectsStore} from './'

@Injectable()
export class ProjectsResolver implements Resolve<ProjectVM[]> {

  constructor(private store: ProjectsStore) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Promise<ProjectVM[]> {
    return this.store.allProjects$.first().toPromise()
  }

}
