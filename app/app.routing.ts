import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {DetailComponent} from './detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'project/:id',
    component: DetailComponent
  },
  {
    path: '**',
    component: DashboardComponent
  }
];

export const ROUTING = RouterModule.forRoot(appRoutes, {useHash: true});
