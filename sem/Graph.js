import React, {Component} from 'react'
import cytoscape from 'cytoscape'
import { conf, layout } from './conf'
import { getEstimateKeyName } from './Util'

class Graph extends Component {
  componentDidMount () {
    conf.container = this.refs.cyelement
    this.cy = cytoscape(conf)
    this.updateJson(this.props)
  }

  componentWillUpdate (nextProps) {
    this.updateJson(nextProps)
  }

  updateJson (props) {
    this.cy.json(this.buildGraph(props))
    this.cy.layout(layout)
  }

  componentWillUnmount () {
    this.cy.destroy()
  }

  buildGraph (props) {
    const { covariances, latent_variables, regressions, names } = props.json,
          nodes = [],
          edges = [],
          estimateKeyName = getEstimateKeyName(props.standardized)
    let p


    for (let key in names) {
      for (let name of names[key]) {
        nodes.push({ data: { id: name, name: name, group: key, value: 0 } })
      }
    }

    // 潜在変数の定義式より、リンクを作成
    for (const leftVar in latent_variables) {
      for (const rightVar of latent_variables[leftVar]) {
        p = (rightVar['P(>|z|)']) ? rightVar['P(>|z|)'] : 0
        edges.push({ data: { id: [leftVar, rightVar.name].join('_'), source: leftVar, target: rightVar.name, value: parseFloat(rightVar[estimateKeyName]), p: p } })
      }
    }

    // 回帰の式からリンクを作成
    for (const leftVar in regressions) {
      for (const rightVar of regressions[leftVar]) {
        p = (rightVar['P(>|z|)']) ? rightVar['P(>|z|)'] : 0
        edges.push({ data: { id: [rightVar.name, leftVar].join('_'), source: rightVar.name, target: leftVar, value: parseFloat(rightVar[estimateKeyName]), p: p } })
      }
    }

    // 共分散のリンクを作成
    for (const rowName in covariances) {
      for (const coObj of covariances[rowName]) {
        const p = (coObj['P(>|z|)']) ? coObj['P(>|z|)'] : 0
        edges.push({ data: { id: [rowName, coObj.name].join('_'), source: rowName, target: coObj.name, value: parseFloat(coObj[estimateKeyName]), p: p, group: 'cov' } })
      }
    }

    // 直接効果の合計を計算
    for (const edge of edges) {
      if (edge.data.group === 'cov') continue
      for (const node of nodes) {
        if (node.data.id === edge.data.source) node.data.value += edge.data.value
      }
    }

    return { elements: { nodes: nodes, edges: edges } }
  }

  render () {
    const divStyle = {
      height: '80%',
      width: '70%'
    }

    return <div style={divStyle} className='Graph' ref='cyelement' />
  }
}

export default Graph
