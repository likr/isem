import {Component, Input} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'
import {getEstimateKeyName} from './estimate-key-name'

@Component({
  selector: 'is-covariance-matrix',
  templateUrl: './covariance-matrix.component.html',
  styleUrls: ['./covariance-matrix.component.css']
})
export class CovarianceMatrixComponent extends AbstractComponent {
  @Input() json: any
  @Input() standardized: boolean
  data = {
    matrix: {},
    names: []
  }

  ngOnChanges() {
    const {covariances, names, variances} = this.json

    if (names) {
      const estimateKeyName = getEstimateKeyName(this.standardized)
      const matrix = {}
      const mergedNames = names.lat.concat(names.obs)

      for (const rowName of mergedNames) {
        matrix[rowName] = {}
        for (const columnName of mergedNames) {
          matrix[rowName][columnName] = undefined
        }
      }

      // 分散
      for (const varName in variances) {
        matrix[varName][varName] = variances[varName][estimateKeyName]
      }

      // 共分散
      for (const rowName in covariances) {
        for (const variable of covariances[rowName]) {
          matrix[rowName][variable.name] = variable[estimateKeyName]
          matrix[variable.name][rowName] = variable[estimateKeyName]
        }
      }

      this.data = {
        matrix,
        names: mergedNames
      }
    }
  }
}
