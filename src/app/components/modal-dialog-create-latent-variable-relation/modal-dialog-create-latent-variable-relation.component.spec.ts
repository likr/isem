/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogCreateLatentVariableRelationComponent} from './modal-dialog-create-latent-variable-relation.component'

describe('ModalDialogCreateLatentVariableRelationComponent', () => {
  let component: ModalDialogCreateLatentVariableRelationComponent
  let fixture: ComponentFixture<ModalDialogCreateLatentVariableRelationComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogCreateLatentVariableRelationComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogCreateLatentVariableRelationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
