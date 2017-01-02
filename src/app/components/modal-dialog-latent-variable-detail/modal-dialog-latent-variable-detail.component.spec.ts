/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogLatentVariableDetailComponent} from './modal-dialog-latent-variable-detail.component'

describe('ModalDialogLatentVariableDetailComponent', () => {
  let component: ModalDialogLatentVariableDetailComponent
  let fixture: ComponentFixture<ModalDialogLatentVariableDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogLatentVariableDetailComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogLatentVariableDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
