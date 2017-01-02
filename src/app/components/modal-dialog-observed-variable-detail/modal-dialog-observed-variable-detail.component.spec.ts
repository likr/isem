/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogObservedVariableDetailComponent} from './modal-dialog-observed-variable-detail.component'

describe('ModalDialogObservedVariableDetailComponent', () => {
  let component: ModalDialogObservedVariableDetailComponent
  let fixture: ComponentFixture<ModalDialogObservedVariableDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogObservedVariableDetailComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogObservedVariableDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
