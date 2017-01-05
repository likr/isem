/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModelsComponent} from './models.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {UiAddButtonComponent} from '../ui-add-button/ui-add-button.component'
import {UiDeleteIconComponent} from '../ui-delete-icon/ui-delete-icon.component'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'

class MockModalDialogActionsService {}
class MockProjectsActionsService {}
class MockAppDispatcherService {}

describe('ModelsComponent', () => {
  let component: ModelsComponent
  let fixture: ComponentFixture<ModelsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelsComponent,
        MockTranslatePipe,
        UiAddButtonComponent,
        UiDeleteIconComponent,
      ],
      providers: [
        {provide: ModalDialogActionsService, useClass: MockModalDialogActionsService},
        {provide: ProjectsActionsService, useClass: MockProjectsActionsService},
        {provide: AppDispatcherService, useClass: MockAppDispatcherService},
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
