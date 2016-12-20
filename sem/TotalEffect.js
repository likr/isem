import React, {Component} from 'react'
import Heatmap from './Heatmap'
import { getEstimateKeyName } from './Util'

class TotalEffect extends Component {
  render () {
    const { total_effects, names } = this.props.json,
          estimateKeyName = getEstimateKeyName(this.props.standardized)

    if (names === undefined) return <div />

    let mergedNames = names.lat.concat(names.obs)

    return <div style={{ textAlign: 'right' }}>
      <h3 style={{fontSize: 14}}>総合効果行列</h3>
      <Heatmap matrix={total_effects[estimateKeyName]} names={mergedNames} />
    </div>
  }
}

export default TotalEffect
