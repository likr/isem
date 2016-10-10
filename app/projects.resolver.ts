import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'

import {ProjectsRepository} from './projects.repository'

export class ProjectsResolver implements Resolve<any> {

  constructor(private projectsRepository: ProjectsRepository) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Promise<any> {
    return this.projectsRepository.all$.first().toPromise()
  }

}
