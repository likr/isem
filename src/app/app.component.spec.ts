/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement, Component, Input} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {RouterTestingModule} from '@angular/router/testing'

import {AppComponent} from './app.component'
import {MockTranslatePipe} from './mocks/pipes/mock-translate.pipe'
import {DatabaseAdapterService} from './services/database-adapter.service'
import {AppStoreService} from './app-store.service'
import {MockAppStoreService} from './mocks/mock-app-store.service'

@Component({
  selector: 'is-modal-dialog',
  template: ''
})
class MockModalDialogComponent {
  @Input() type: any
  @Input() isVisible: any
}

class MockDatabaseAdapterService {}

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        MockTranslatePipe,
        MockModalDialogComponent
      ],
      providers: [
        {provide: DatabaseAdapterService, useClass: MockDatabaseAdapterService},
        {provide: AppStoreService, useClass: MockAppStoreService},
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
