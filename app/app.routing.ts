import {Routes, RouterModule} from '@angular/router'

import {DashboardComponent} from './components/dashboard.component'
import {DetailComponent} from './components/detail.component'
import {ProjectsResolver} from './application/project/projects.resolver'

export type ViewName = 'dashboard' | 'detail'

export const PROJECTS = 'projects'
export const ID = 'id'

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      [PROJECTS]: ProjectsResolver
    }
  },
  {
    path: `project/:${ID}`,
    component: DetailComponent,
    resolve: {
      [PROJECTS]: ProjectsResolver
    }
  },
  {
    path: '**',
    component: DashboardComponent,
    resolve: {
      [PROJECTS]: ProjectsResolver
    }
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
