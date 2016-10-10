import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'
import {AppStore} from './app.store'
import {ProjectVM} from './application/view-model/project-vm'

@Component({
  selector: 'is-dashboard',
  template: `
    <div>
      <h2>{{'CreateNewProject' | translate}}</h2>
      <is-ui-button
        [label]="'LoadFile' | translate"
        [type] ="'primary'"
        (clickButton)="onClickLoadFile($event)"
      ></is-ui-button>
    </div>
    
    <div>
      <h2>{{'ProjectList' | translate}}</h2>
    </div>
    <ul>
      <li *ngFor="let project of projects">{{project.uuid}}</li>
    </ul>
  `
})
export class DashboardComponent {

  projects: ProjectVM[]

  constructor(private route: ActivatedRoute,
              private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: AppStore) {
    this.projects = []
  }

  ngOnInit() {
    this.store.allProjects$.subscribe((v) => {
      this.projects = v
    })
    this.dispatcher.emit(this.actions.setCurrentView('dashboard'))
  }

  onClickLoadFile() {
    this.dispatcher.emit(this.actions.openModalDialodLoadFile())
  }

}
