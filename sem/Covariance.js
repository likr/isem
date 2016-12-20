import React, {Component} from 'react'
import Heatmap from './Heatmap'
import { getEstimateKeyName } from './Util'

class Covariance extends Component {
  render () {
    const { covariances, names, variances } = this.props.json

    if (!names) return <div />
    const estimateKeyName = getEstimateKeyName(this.props.standardized)

    let matrix = {}

    let mergedNames = names.lat.concat(names.obs)

    for (const rowName of mergedNames) {
      matrix[rowName] = {}
      for (const column_name of mergedNames) {
        matrix[rowName][column_name] = undefined
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

    return <div style={{ textAlign: 'right' }}>
      <h3 style={{fontSize: 14}}>共分散行列</h3>
      <Heatmap matrix={matrix} names={mergedNames} />
    </div>
  }
}

export default Covariance
