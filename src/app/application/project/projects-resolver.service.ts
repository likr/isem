import {Injectable} from '@angular/core'
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'

import {ProjectVm} from './project-vm'
import {ProjectsStoreService} from './projects-store.service'

@Injectable()
export class ProjectsResolverService implements Resolve<ProjectVm[]> {

  constructor(private store: ProjectsStoreService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Promise<ProjectVm[]> {
    return this.store.allProjects$.first().toPromise()
  }

}
