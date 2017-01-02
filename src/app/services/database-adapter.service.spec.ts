/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {DatabaseAdapterService} from './database-adapter.service'

describe('DatabaseAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseAdapterService]
    })
  })

  it('should ...', inject([DatabaseAdapterService], (service: DatabaseAdapterService) => {
    expect(service).toBeTruthy()
  }))
})
