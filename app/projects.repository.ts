import {Injectable} from '@angular/core'

import {CsvToJsonAdapter} from './csv-to-json-adapter.service'

@Injectable()
export class ProjectsRepository {

  constructor(private csvToJson: CsvToJsonAdapter) {}

  create(modelCsv: string) {
    const jsonObj = this.csvToJson.convert(modelCsv)
    console.log(jsonObj)
  }

}
