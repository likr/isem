import {Routes, RouterModule} from '@angular/router'

import {DashboardComponent} from './components/dashboard/dashboard.component'
import {DetailComponent} from './components/detail/detail.component'
import {ProjectsResolverService} from './application/project/projects-resolver.service'

export type ViewName = 'dashboard' | 'detail'

export const PROJECTS = 'projects' // resolve.projects
export const ID       = 'id' // path :id

const appRoutes: Routes = [
  {
    path     : '',
    component: DashboardComponent,
    resolve  : {
      projects: ProjectsResolverService
    }
  },
  {
    path     : `project/:id`,
    component: DetailComponent,
    resolve  : {
      projects: ProjectsResolverService
    }
  },
  {
    path     : '**',
    component: DashboardComponent,
    resolve  : {
      projects: ProjectsResolverService
    }
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes)
