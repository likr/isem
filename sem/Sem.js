import React, { Component } from 'react'
import Graph from './Graph'
import Fit from './Fit'
import Covariance from './Covariance'
import TotalEffect from './TotalEffect'

const defaultHide = { graph: false, fit: false, covariance: false, totalEffect: false }

class Sem extends Component {
  render () {
    let { json, hide, standardized } = this.props
    if (hide === undefined) hide = defaultHide

    const vizComponents = []

    if (!hide.graph) vizComponents.push(<Graph key='graph' json={json} standardized={standardized} />)
    if (!hide.fit) vizComponents.push(<Fit key='fit' goodness_of_fit={json.goodness_of_fit} />)

    const matrixComponents = []
    if (!hide.covariance) matrixComponents.push(<Covariance key='covariance' json={json} standardized={standardized} />)
    if (!hide.totalEffect) matrixComponents.push(<TotalEffect key='total-effect' json={json} standardized={standardized} />)

    vizComponents.push(
      <div key='matrix' style={{
        overflow: 'scroll',
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        backgroundColor: 'rgba(245, 245, 245, 0.8)'
      }} >
        { matrixComponents }
      </div>
    )

    return <div className='Sem' style={{ position: 'relative', height: '100%' }}>
      { vizComponents }
    </div>
  }
}

export default Sem
