import {Routes, RouterModule} from '@angular/router'

import {DashboardComponent} from './dashboard.component'
import {DetailComponent} from './detail.component'
import {ProjectsResolver} from './projects.resolver'

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
