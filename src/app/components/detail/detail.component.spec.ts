/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, Component, Input} from '@angular/core'
import {RouterTestingModule} from '@angular/router/testing'

import {DetailComponent} from './detail.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {UiInfoIconComponent} from '../ui-info-icon/ui-info-icon.component'
import {UiAddButtonComponent} from '../ui-add-button/ui-add-button.component'
import {UiDeleteIconComponent} from '../ui-delete-icon/ui-delete-icon.component'
import {AppActionsService} from '../../app-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {AppStoreService} from '../../app-store.service'
import {MockProjectsStoreService} from '../../mocks/application/project/mock-projects-store.service'
import {MockAppStoreService} from '../../mocks/mock-app-store.service'
import {MockProjectsActionsService} from '../../mocks/application/project/mock-projects-actions.service'
import {MockAppActionsService} from '../../mocks/mock-app-actions.service'

@Component({
  selector: 'is-variables',
  template: '',
})
class MockVariablesComponent {
  @Input() observedVariables: any
  @Input() latentVariables: any
}

@Component({
  selector: 'is-models',
  template: '',
})
class MockModelsComponent {
  @Input() covariances: any
  @Input() intercepts: any
  @Input() latentVariableRelations: any
  @Input() regressions: any
}

describe('DetailComponent', () => {
  let component: DetailComponent
  let fixture: ComponentFixture<DetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        DetailComponent,
        MockTranslatePipe,
        MockVariablesComponent,
        MockModelsComponent,
        UiInfoIconComponent,
        UiAddButtonComponent,
        UiDeleteIconComponent
      ],
      providers: [
        {provide: AppActionsService, useClass: MockAppActionsService},
        {provide: ProjectsActionsService, useClass: MockProjectsActionsService},
        AppDispatcherService,
        {provide: ProjectsStoreService, useClass: MockProjectsStoreService},
        {provide: AppStoreService, useClass: MockAppStoreService},
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
