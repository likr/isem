import {Injectable} from '@angular/core'
import * as Papa from 'papaparse'

@Injectable()
export class PapaParseProvider {

  get<T>(): (modelCsv: string) => T[] {
    return (modelCsv: string) => {
      return Papa.parse(modelCsv, {header: true}).data as T[]
    }
  }

}
