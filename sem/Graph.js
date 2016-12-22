import React, {Component} from 'react'
import cytoscape from 'cytoscape'
import { conf, layout } from './conf'
import { getEstimateKeyName } from './Util'

const formatP = (p) => {
  return (p) ? parseFloat(p) : 0
}

const genEdge = (sourceVar, targetVar, value, p, group) => {
  return {
    data: {
      id: [sourceVar, targetVar].join('_'),
      source: sourceVar,
      target: targetVar,
      value: parseFloat(value),
      p: formatP(p),
      group: group
    }
  }
}

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
        nodes.push({
          data: {
            id: name,
            name: name,
            group: key,
            value: 0
          }
        })
      }
    }

    // 潜在変数の定義式より、リンクを作成
    for (const leftVarName in latent_variables) {
      for (const rightVar of latent_variables[leftVarName]) {
        edges.push(genEdge(leftVarName, rightVar.name, rightVar[estimateKeyName], rightVar['P(>|z|)']))
      }
    }

    // 回帰の式からリンクを作成
    for (const leftVarName in regressions) {
      for (const rightVar of regressions[leftVarName]) {
        edges.push(genEdge(rightVar.name, leftVarName, rightVar[estimateKeyName], rightVar['P(>|z|)']))
      }
    }

    // 共分散のリンクを作成
    for (const leftVarName in covariances) {
      for (const rightVar of covariances[leftVarName]) {
        edges.push(genEdge(leftVarName, rightVar.name, rightVar[estimateKeyName], rightVar['P(>|z|)'], 'cov'))
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
