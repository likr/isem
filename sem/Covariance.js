import React, {Component} from 'react'
import Heatmap from './Heatmap'

class Covariance extends Component {
  render () {
    const { covariances, names, variances } = this.props.json

    if (names === undefined) return <div />

    let matrix = {}

    let mergedNames = names.lat.concat(names.obs)

    for (const row_name of mergedNames) {
      matrix[row_name] = {}
      for (const column_name of mergedNames) {
        matrix[row_name][column_name] = undefined
      }
    }

    // 分散
    for (const row_name of mergedNames) {
      matrix[row_name][row_name] = variances[row_name].Estimate
    }

    // 共分散
    for (const row_name in covariances) {
      for (const co_obj of covariances[row_name]) {
        matrix[row_name][co_obj.name] = co_obj.Estimate
        matrix[co_obj.name][row_name] = co_obj.Estimate
      }
    }

    return <div style={{ textAlign: 'right' }}>
      <h3 style={{fontSize: 14}}>共分散行列</h3>
      <Heatmap matrix={matrix} names={mergedNames} />
    </div>
  }
}

export default Covariance
