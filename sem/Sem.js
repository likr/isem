import React, { Component } from 'react'
import Graph from './Graph'
import Fit from './Fit'

class Sem extends Component {
  render () {
    return (
      <div className='Sem'>
        <Graph json={this.props.json} />
        <Fit json={this.props.json} />
      </div>
    )
  }
}

export default Sem
