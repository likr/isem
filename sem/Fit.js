import React, {Component} from 'react'

const fitsConds = {
  gfi: { greaterThan: 0.9 },
  agfi: { greaterThan: 0.9 },
  cfi: { greaterThan: 0.9 },
  rmr: {},
  rmsea: { lessThan: 0.1 },
  aic: {}
}

const isGood = (name, val) => {
  if ('greaterThan' in fitsConds[name]) {
    return (val >= fitsConds[name].greaterThan)
  }
  if ('lessThan' in fitsConds[name]) {
    return (val <= fitsConds[name].lessThan)
  }
}

const fitColor = (name, val) => {
  switch (isGood(name, val)) {
    case true:
      return '#1abc9c'
    case false:
      return '#e74c3c'
    default:
      return '#2c3e50'
  }
}

class Fit extends Component {
  render () {
    const fits = this.props.goodness_of_fit
    let rows = []

    if (!fits) return <div className='Fit' />

    for (const fitKeyName in fitsConds) {
      rows.push(
        <tr key={fitKeyName} style={{ background: fitColor(fitKeyName, fits[fitKeyName]), padding: '1em' }} >
          <th style={{ padding: '0.2em' }}>{fitKeyName.toUpperCase()}</th>
          <td style={{ textAlign: 'right', padding: '0.2em 0 0.2em 0.2em' }} >{fits[fitKeyName].split('.')[0]}</td>
          <td style={{ textAlign: 'left', padding: '0.2em 0.2em 0.2em 0' }} >.{fits[fitKeyName].split('.')[1]}</td>
        </tr>
      )
    }

    return <div className='Fit' style={{
      position: 'absolute',
      left: 0,
      bottom: 0
    }}>
      <table style={{ color: 'white' }}>
        <tbody>{rows}</tbody>
      </table>
    </div>
  }
}

export default Fit
