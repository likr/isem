import {Routes, RouterModule} from '@angular/router'

import {DashboardComponent, DetailComponent} from '../../components'
import {ProjectsResolver} from '../project'

export type ViewName = 'dashboard' | 'detail'

export const PROJECTS = 'projects'
export const ID       = 'id'

const appRoutes: Routes = [
  {
    path     : '',
    component: DashboardComponent,
    resolve  : {
      [PROJECTS]: ProjectsResolver
    }
  },
  {
    path     : `project/:${ID}`,
    component: DetailComponent,
    resolve  : {
      [PROJECTS]: ProjectsResolver
    }
  },
  {
    path     : '**',
    component: DashboardComponent,
    resolve  : {
      [PROJECTS]: ProjectsResolver
    }
  }
]

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true})
