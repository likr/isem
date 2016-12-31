import {Component} from '@angular/core'

import {AbstractComponent} from './abstract'
import {ProjectVM, ProjectsStore} from '../application/project'
import {AppActions, AppDispatcher} from '../application/app'
import {ModalDialogActions} from '../application/modal-dialog'
import {ProjectsActions} from '../application/project/projects.actions'

@Component({
  selector: 'is-dashboard',
  template: `
    <style>
      :host {
        display: block;
        width: 100%;
        height: calc(100% - 64px/* appComponentCssHeight */);
      }
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
      button {
        cursor: pointer;
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
              *ngFor="let project of projectVMs"
              (click)="onClickProject(project)"
            >
              <td>{{project.name}}</td>
              <td>{{project.modified}}</td>
              <td class="delete">
                <button (click)="onClickDelete($event, project)">
                  {{'Delete' | translate}}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardComponent extends AbstractComponent {

  projectVMs: ProjectVM[]

  constructor(private appActions: AppActions,
              private projects: ProjectsActions,
              private modalDialog: ModalDialogActions,
              private dispatcher: AppDispatcher,
              private store: ProjectsStore) {
    super()
    this.projectVMs = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.allProjects$.subscribe((v) => {
        this.projectVMs = v
      })
    )
    this.dispatcher.emit(this.appActions.setCurrentView('dashboard'))
  }

  onClickLoadFile() {
    this.dispatcher.emit(this.modalDialog.openLoadFile())
  }

  onClickProject(project: ProjectVM) {
    this.dispatcher.emit(this.projects.showDetail(project))
  }

  onClickDelete(ev: MouseEvent, project: ProjectVM) {
    ev.stopPropagation()
    this.dispatcher.emit(this.projects.deleteProject(project))
  }

}
