import {Component} from '@angular/core'

import {AppActions} from '../app.actions'
import {AppDispatcher} from '../app.dispatcher'
import {AppStore} from '../app.store'
import {ProjectVM} from '../application/project/project-vm'
import {AbstractComponent} from './abstract.component'

@Component({
  selector: 'is-dashboard',
  template: `
    <style>
      .container {
        width: 80vw;
        margin: 3em auto 0;
        padding: 0 15px;
      }
      .section {
        margin-bottom: 20px;
      }
      h2 {
        margin-bottom: 10px;
      }
      table {
        width: 100%
      }
      td, th {
        padding: 8px;
        text-align: left
      }
      .delete {
        text-align: right
      }
      tbody tr {
        cursor: pointer;
        transition: .1s;
      }
      tbody tr:hover {
        background-color: #CFD8DC;
        transition: .2s; 
      }
      td {
        border-bottom: 1px solid #ddd;
      }
      th {
        border-bottom: 1px solid #999;
      }
    </style>
    <div class="container">
      <div class="section">
        <h2>{{'CreateNewProject' | translate}}</h2>
        <is-ui-button
          [label]="'LoadFile' | translate"
          [type] ="'primary'"
          (clickButton)="onClickLoadFile($event)"
        ></is-ui-button>
      </div>
      
      <div class="section">
        <h2>{{'ProjectList' | translate}}</h2>
        <table>
          <thead>
            <tr>
              <th>{{'ProjectName' | translate}}</th>
              <th>{{'LastUpdateDate' | translate}}</th>
              <th class="delete">{{'Delete' | translate}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let project of projects"
              (click)="onClickProject(project)"
            >
              <td>{{project.name}}</td>
              <td>{{project.modified}}</td>
              <td class="delete"><button (click)="onClickDelete(project)">
                {{'Delete' | translate}}
              </button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardComponent extends AbstractComponent {

  projects: ProjectVM[]

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher,
              private store: AppStore) {
    super()
    this.projects = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.allProjects$.subscribe((v) => {
        this.projects = v
      })
    )
    this.dispatcher.emit(this.actions.setCurrentView('dashboard'))
  }

  onClickLoadFile() {
    this.dispatcher.emit(this.actions.openModalDialodLoadFile())
  }

  onClickProject(project: ProjectVM) {
    this.dispatcher.emit(this.actions.showDetail(project))
  }

  onClickDelete(project: ProjectVM) {
    this.dispatcher.emit(this.actions.deleteProject(project))
  }

}
