/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogCreateRegressionComponent} from './modal-dialog-create-regression.component'

describe('ModalDialogCreateRegressionComponent', () => {
  let component: ModalDialogCreateRegressionComponent
  let fixture: ComponentFixture<ModalDialogCreateRegressionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogCreateRegressionComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogCreateRegressionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
