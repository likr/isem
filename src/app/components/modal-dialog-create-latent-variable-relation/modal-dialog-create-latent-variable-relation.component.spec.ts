/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogCreateLatentVariableComponent} from './modal-dialog-create-latent-variable.component'

describe('ModalDialogCreateLatentVariableComponent', () => {
  let component: ModalDialogCreateLatentVariableComponent
  let fixture: ComponentFixture<ModalDialogCreateLatentVariableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogCreateLatentVariableComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogCreateLatentVariableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
