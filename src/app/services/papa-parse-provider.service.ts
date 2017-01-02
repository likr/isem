import {Injectable} from '@angular/core'
import * as Papa from 'papaparse'

@Injectable()
export class PapaParseProviderService {

  get<T>(): (modelCsv: string) => T[] {
    return (modelCsv: string) => {
      return Papa.parse(modelCsv).data as T[]
    }
  }

}
