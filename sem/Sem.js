import React, { Component } from 'react'
import Graph from './Graph'
import Fit from './Fit'
import Covariance from './Covariance'
import TotalEffect from './TotalEffect'

const defaultHide = { graph: false, fit: false, covariance: false, totalEffect: false }

class Sem extends Component {
  render () {
    let { json, hide } = this.props
    if (hide === undefined) hide = defaultHide

    const vizComponents = []

    if (!hide.graph) vizComponents.push(<Graph json={json} />)
    if (!hide.fit)   vizComponents.push(<Fit goodness_of_fit={json.goodness_of_fit} />)

    const matrixComponents = []
    if (!hide.covariance)  matrixComponents.push(<Covariance json={json} />)
    if (!hide.totalEffect) matrixComponents.push(<TotalEffect json={json} />)

    vizComponents.push(
      <div style={{ overflow: 'scroll', position: 'absolute', right: 0, top: 0, height: '100%' }} >
        { matrixComponents }
      </div>
    )

    return <div className='Sem' style={{ position: 'relative', height: '100%' }}>
      { vizComponents }
    </div>
  }
}

export default Sem
