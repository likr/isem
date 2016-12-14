import React, { Component } from 'react'
import Graph from './Graph'
import Fit from './Fit'
import Covariance from './Covariance'

class Sem extends Component {
  render () {
    return <div className='Sem' style={{position: 'relative', height: '100%'}}>
      <Graph json={this.props.json} />
      <Fit goodness_of_fit={this.props.json.goodness_of_fit} />
      <Covariance json={this.props.json} />
    </div>
  }
}

export default Sem
