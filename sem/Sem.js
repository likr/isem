import React, { Component } from 'react'
import Graph from './Graph'
import Fit from './Fit'
import Covariance from './Covariance'
import TotalEffect from './TotalEffect'

class Sem extends Component {
  render () {
    return <div className='Sem' style={{position: 'relative', height: '100%'}}>
      <Graph json={this.props.json} />
      <Fit goodness_of_fit={this.props.json.goodness_of_fit} />
      <div style={{ overflow: 'scroll', position: 'absolute', right: 0, top: 0, height: '100%' }} >
        <Covariance json={this.props.json} />
        <TotalEffect json={this.props.json} />
      </div>
    </div>
  }
}

export default Sem
