/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogCreateInterceptComponent} from './modal-dialog-create-intercept.component'

describe('ModalDialogCreateInterceptComponent', () => {
  let component: ModalDialogCreateInterceptComponent
  let fixture: ComponentFixture<ModalDialogCreateInterceptComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogCreateInterceptComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogCreateInterceptComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
