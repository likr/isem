import {Injectable} from '@angular/core'

import {PapaParseProviderService} from './papa-parse-provider.service'

@Injectable()
export class CsvToJsonAdapterService {

  constructor(private provider: PapaParseProviderService) {}

  /**
   * # example
   *
   * head1,head2
   * value1,value2
   *
   * to be
   *
   * [
   *   [head1, head2],
   *   [value1, value2]
   * ]
   */
  convert(modelCsv: string): any[][] {
    const parse = this.provider.get<any>()
    return parse(modelCsv)
  }

}
