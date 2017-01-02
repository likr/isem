import {Routes, RouterModule} from '@angular/router'

import {DashboardComponent} from './components/dashboard/dashboard.component'
import {DetailComponent} from './components/detail/detail.component'
import {ProjectsResolverService} from './application/project/projects-resolver.service'

export type ViewName = 'dashboard' | 'detail'

export const PROJECTS = 'projects'
export const ID       = 'id'

const appRoutes: Routes = [
  {
    path     : '',
    component: DashboardComponent,
    resolve  : {
      [PROJECTS]: ProjectsResolverService
    }
  },
  {
    path     : `project/:${ID}`,
    component: DetailComponent,
    resolve  : {
      [PROJECTS]: ProjectsResolverService
    }
  },
  {
    path     : '**',
    component: DashboardComponent,
    resolve  : {
      [PROJECTS]: ProjectsResolverService
    }
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
