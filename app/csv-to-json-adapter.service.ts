import {Injectable} from '@angular/core'

import {PapaParseProvider} from './papa-parse.provider'

@Injectable()
export class CsvToJsonAdapter {

  constructor(private papaParseProvider: PapaParseProvider) {}

  /**
   * # example
   *
   * head1,head2
   * value1,value2
   *
   * to be
   *
   * [
   *   {head1: 'value1', head2: 'value2'}
   * ]
   */
  convert(modelCsv: string): any[] {
    const parse = this.papaParseProvider.get<any>()
    return parse(modelCsv)
  }

}
