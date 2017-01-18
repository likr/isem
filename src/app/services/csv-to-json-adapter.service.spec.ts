/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {CsvToJsonAdapterService} from './csv-to-json-adapter.service'
import {PapaParseProviderService} from './papa-parse-provider.service'

describe('CsvToJsonAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CsvToJsonAdapterService,
        PapaParseProviderService,
      ]
    })
  })

  it('should ...', inject([CsvToJsonAdapterService], (service: CsvToJsonAdapterService) => {
    expect(service).toBeTruthy()
  }))
})
