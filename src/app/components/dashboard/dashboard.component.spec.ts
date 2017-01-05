/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {DashboardComponent} from './dashboard.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {UiButtonComponent} from '../ui-button/ui-button.component'
import {AppActionsService} from '../../app-actions.service'
import {MockAppActionsService} from '../../mocks/mock-app-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {MockProjectsActionsService} from '../../mocks/application/project/mock-projects-actions.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {MockProjectsStoreService} from '../../mocks/application/project/mock-projects-store.service'

class MockModalDialogActionsService {}

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockTranslatePipe,
        UiButtonComponent
      ],
      providers: [
        {provide: AppActionsService, useClass: MockAppActionsService},
        {provide: ProjectsActionsService, useClass: MockProjectsActionsService},
        {provide: ModalDialogActionsService, useClass: MockModalDialogActionsService},
        AppDispatcherService,
        {provide: ProjectsStoreService, useClass: MockProjectsStoreService},
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
