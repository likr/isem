import {Routes, RouterModule} from '@angular/router'

import {DashboardComponent} from './dashboard.component'
import {DetailComponent} from './detail.component'
import {ProjectsResolver} from './projects.resolver'

export type ViewName = 'dashboard' | 'detail'

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      projects: ProjectsResolver
    }
  },
  {
    path: 'project/:id',
    component: DetailComponent,
    resolve: {
      projects: ProjectsResolver
    }
  },
  {
    path: '**',
    component: DashboardComponent,
    resolve: {
      projects: ProjectsResolver
    }
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
