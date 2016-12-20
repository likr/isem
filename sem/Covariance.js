import React, {Component} from 'react'
import Heatmap from './Heatmap'

class Covariance extends Component {
  render () {
    const { covariances, names, variances } = this.props.json

    if (!names) return <div />

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
      matrix[varName][varName] = variances[varName].Estimate
    }

    // 共分散
    for (const rowName in covariances) {
      for (const variable of covariances[rowName]) {
        matrix[rowName][variable.name] = variable.Estimate
        matrix[variable.name][rowName] = variable.Estimate
      }
    }

    return <div style={{ textAlign: 'right' }}>
      <h3 style={{fontSize: 14}}>共分散行列</h3>
      <Heatmap matrix={matrix} names={mergedNames} />
    </div>
  }
}

export default Covariance
