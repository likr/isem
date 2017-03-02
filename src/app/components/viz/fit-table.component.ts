import {Component, Input} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'

const GOOD = 'good'
const OK = 'ok'
const POOR = 'poor'
const NORMAL = 'normal'

const fitConditions = [
  {
    name: 'gfi',
    conditions: [
      {
        condition: (v) => v > 0.9,
        status: GOOD,
      },
      {
        condition: (v) => v > 0.7,
        status: OK,
      },
      {
        condition: (v) => true,
        status: POOR,
      }
    ]
  },
  {
    name: 'agfi',
    conditions: [
      {
        condition: (v) => v > 0.9,
        status: GOOD,
      },
      {
        condition: (v) => v > 0.7,
        status: OK,
      },
      {
        condition: (v) => true,
        status: POOR,
      }
    ]
  },
  {
    name: 'srmr',
    conditions: [
      {
        condition: (v) => v < 0.05,
        status: GOOD,
      },
      {
        condition: (v) => v < 0.1,
        status: OK,
      },
      {
        condition: (v) => true,
        status: POOR,
      }
    ]
  },
  {
    name: 'rmr',
    conditions: [
      {
        condition: (v) => true,
        status: NORMAL,
      }
    ]
  },
  {
    name: 'aic',
    conditions: [
      {
        condition: (v) => true,
        status: NORMAL,
      }
    ]
  },
  {
    name: 'bic',
    conditions: [
      {
        condition: (v) => true,
        status: NORMAL,
      }
    ]
  },
]

@Component({
  selector: 'is-fit-table',
  templateUrl: './fit-table.component.html',
  styleUrls: ['./fit-table.component.css']
})
export class FitTableComponent extends AbstractComponent {
  @Input() goodnessOfFit: any
  rows = []

  ngOnChanges() {
    if (this.goodnessOfFit) {
      this.rows = fitConditions.map(({name, conditions}) => {
        const value= this.goodnessOfFit[name]
        const [decimalPart, fractionalPart] = value.split('.')
        return {
          name,
          decimalPart,
          fractionalPart,
          status: (conditions as any).find(({condition}) => condition(+value)).status,
        }
      })
    }
  }
}
