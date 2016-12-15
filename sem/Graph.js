import React, {Component} from 'react'
import cytoscape from 'cytoscape'
import { conf, layout } from './conf'

class Graph extends Component {
  componentDidMount () {
    conf.container = this.refs.cyelement
    this.cy = cytoscape(conf)
    this.updateJson(this.props.json)
  }

  componentWillUpdate (nextProps) {
    this.updateJson(nextProps.json)
  }

  updateJson (json) {
    this.cy.json(this.buildGraph(json))
    this.cy.layout(layout)
  }

  componentWillUnmount () {
    this.cy.destroy()
  }

  buildGraph (json) {
    const nodes = []
    const edges = []
    let p

    for (let key in json.names) {
      for (let name of json.names[key]) {
        nodes.push({ data: { id: name, name: name, group: key, value: 0 } })
      }
    }

    // 潜在変数の定義式より、リンクを作成
    for (const leftVar in json.latent_variables) {
      if (json.latent_variables.hasOwnProperty(leftVar)) {
        for (const rightVar of json.latent_variables[leftVar]) {
          p = (rightVar['P(>|z|)']) ? rightVar['P(>|z|)'] : 0
          edges.push({ data: { id: [leftVar, rightVar.name].join('_'), source: leftVar, target: rightVar.name, value: parseFloat(rightVar['Estimate']), p: p } })
        }
      }
    }

    // 回帰の式からリンクを作成
    for (const leftVar in json.regressions) {
      if (json.regressions.hasOwnProperty(leftVar)) {
        for (const rightVar of json.regressions[leftVar]) {
          p = (rightVar['P(>|z|)']) ? rightVar['P(>|z|)'] : 0
          edges.push({ data: { id: [rightVar.name, leftVar].join('_'), source: rightVar.name, target: leftVar, value: parseFloat(rightVar['Estimate']), p: p } })
        }
      }
    }

    // 共分散のリンクを作成
    for (const rowName in json.covariances) {
      if (json.covariances.hasOwnProperty(rowName)) {
        for (const coObj of json.covariances[rowName]) {
          const p = (coObj['P(>|z|)']) ? coObj['P(>|z|)'] : 0
          edges.push({ data: { id: [rowName, coObj.name].join('_'), source: rowName, target: coObj.name, value: parseFloat(coObj['Estimate']), p: p, group: 'cov' } })
        }
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
