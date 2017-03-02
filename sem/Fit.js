import React, {Component} from 'react'

// 例: gfiの場合 0-0.7でpoor, 0.7-0.9でok, 0.9-1.0でgoodとする
const fitsConds = {
  gfi: { greaterThan: { ok: 0.7, good: 0.9 } },
  agfi: { greaterThan: { ok: 0.7, good: 0.9 } },
  srmr: { lessThan: { ok: 0.1, good: 0.05 } },
  rmr: {},
  aic: {},
  bic: {}
}

// 条件に使うため定数化しておく
const GOOD = 'good'
const OK = 'ok'
const POOR = 'poor'
const checkCond = (name, val) => {
  if ('greaterThan' in fitsConds[name]) {
    if (val >= fitsConds[name].greaterThan.good) {
      return GOOD
    } else if (val >= fitsConds[name].greaterThan.ok) {
      return OK
    } else {
      return POOR
    }
  }
  if ('lessThan' in fitsConds[name]) {
    if (val <= fitsConds[name].lessThan.good) {
      return GOOD
    } else if (val <= fitsConds[name].lessThan.ok) {
      return OK
    } else {
      return POOR
    }
  }
}

const fitColor = (name, val) => {
  switch (checkCond(name, val)) {
    case GOOD:
      return '#1abc9c' // 青
    case OK:
      return '#f1c40f' // 黄
    case POOR:
      return '#e74c3c' // 赤
    default:
      return '#2c3e50' // 紺
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
