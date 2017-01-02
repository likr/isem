/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogCreateCovarianceComponent} from './modal-dialog-create-covariance.component'

describe('ModalDialogCreateCovarianceComponent', () => {
  let component: ModalDialogCreateCovarianceComponent
  let fixture: ComponentFixture<ModalDialogCreateCovarianceComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogCreateCovarianceComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogCreateCovarianceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
