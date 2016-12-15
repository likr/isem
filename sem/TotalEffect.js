import React, {Component} from 'react'
import Heatmap from './Heatmap'

class TotalEffect extends Component {
  render () {
    const { total_effects, names } = this.props.json

    if (names === undefined) return <div />

    let mergedNames = names.lat.concat(names.obs)

    return <div style={{position: 'absolute', right: 0, bottom: 0, textAlign: 'right'}}>
      <h3 style={{fontSize: 14}}>総合効果行列</h3>
      <Heatmap matrix={total_effects} names={mergedNames} />
    </div>
  }
}

export default TotalEffect
