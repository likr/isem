import React, {Component} from 'react'
import cytoscape from 'cytoscape'
import { conf, layout } from './conf'

class Graph extends Component{
  componentDidMount() {
    conf.container = this.refs.cyelement
    this.cy = cytoscape(conf)
    this.updateJson(this.props.json)
  }

  componentWillUpdate(nextProps) {
    this.updateJson(nextProps.json)
  }

  updateJson(json) {
    this.cy.json(this.build_graph(json))
    this.cy.layout(layout)
  }

  componentWillUnmount() {
    this.cy.destroy()
  }

  build_graph(json) {
    let nodes = [], edges = []
    let p

    for (let key in json.names) {
      for (let name of json.names[key]) {
        nodes.push({ data: { id: name, name: name, group: key, value: 0 } })
      }
    }

    // 潜在変数の定義式より、リンクを作成
    for (const left_var in json.latent_variables) {
      if(json.latent_variables.hasOwnProperty(left_var)) {
        for (const right_var of json.latent_variables[left_var]) {
          p = (right_var['P(>|z|)']) ? right_var['P(>|z|)'] : 0
          edges.push({ data: { id: [left_var, right_var.name].join('_'), source: left_var, target: right_var.name, value: parseFloat(right_var['Estimate']), p: p } })
        }
      }
    }

    // 回帰の式からリンクを作成
    for (const left_var in json.regressions) {
      if(json.regressions.hasOwnProperty(left_var)) {
        for (const right_var of json.regressions[left_var]) {
          p = (right_var['P(>|z|)']) ? right_var['P(>|z|)'] : 0
          edges.push({ data: { id: [right_var.name, left_var].join('_'), source: right_var.name, target: left_var, value: parseFloat(right_var['Estimate']), p: p } })
        }
      }
    }

    // 共分散のリンクを作成
    for (const row_name in json.covariances) {
      if(json.covariances.hasOwnProperty(row_name)) {
        for (const co_obj of json.covariances[row_name]) {
          const p = (co_obj['P(>|z|)']) ? co_obj['P(>|z|)'] : 0
          edges.push({ data: { id: [row_name, co_obj.name].join('_'), source: row_name, target: co_obj.name, value: parseFloat(co_obj['Estimate']), p: p, group: 'cov' } })
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

  render() {
    const divStyle = {
      height: 400
    }

    return <div style={divStyle} className="Graph" ref="cyelement" />
  }
}

export default Graph
