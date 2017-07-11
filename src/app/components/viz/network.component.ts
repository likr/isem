import {Component, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'
import {getEstimateKeyName} from './estimate-key-name'

const cytoscape = require('cytoscape')

const groupToColor = (group) => {
  return (group === 'obs') ? '#16a085' : '#2980b9'
}

const groupToShape = (group) => {
  return (group === 'obs') ? 'roundrectangle' : 'ellipse'
}

const groupToAllowShape = (group) => {
  return (group === 'cov') ? 'triangle' : 'circle'
}

const valueToSize = (value) => {
  // 0..10 to 30..90
  return 6 * value + 30
}

const colorMap = 'mapData(p, 1, 0, #ecf0f1, #e74c3c)'

const style = cytoscape.stylesheet()
  .selector('node')
    .css({
      'content': 'data(name)',
      'width': (ele) => {
        const c = (ele.data('group') === 'obs') ? 2 : 1
        return c * valueToSize(ele.data('value'))
      },
      'height': (ele) => valueToSize(ele.data('value')),
      'shape': (ele) => groupToShape(ele.data('group')),
      'text-valign': 'center',
      'color': 'white',
      'text-outline-width': 2,
      'font-weight': 300,
      'text-outline-color': (ele) => groupToColor(ele.data('group')),
      'background-color': (ele) => groupToColor(ele.data('group'))
    })
  .selector('edge')
    .css({
      'label': 'data(value)',
      'text-outline-width': 2,
      'font-size': '0.8em',
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'source-arrow-shape': (ele) => groupToAllowShape(ele.data('group')),
      'text-outline-color': colorMap,
      'line-color': colorMap,
      'source-arrow-color': colorMap,
      'target-arrow-color': colorMap,
      'width': 'mapData(value, 0, 1, 1, 10)'
    })

const conf = {
}

const layout = {
  name: 'cose',
  ready: () => {},
  stop: () => {},
  animate: true,
  animationThreshold: 250,
  refresh: 20,
  fit: true,
  padding: 5,
  boundingBox: undefined,
  randomize: true,
  componentSpacing: 300,
  nodeRepulsion: (node) => 100000,
  nodeOverlap: 10,
  idealEdgeLength: (edge) => 15,
  edgeElasticity: (edge) => 100,
  nestingFactor: 10,
  gravity: 10,
  numIter: 10000,
  initialTemp: 200,
  coolingFactor: 0.95,
  minTemp: 1.0,
  useMultitasking: true
}

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

const buildGraph = (json, standardized) => {
  const { covariances, regressions, names } = json
  const lantentVariables = json.latent_variables
  const nodes = []
  const edges = []
  const estimateKeyName = getEstimateKeyName(standardized)

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
  for (const leftVarName in lantentVariables) {
    for (const rightVar of lantentVariables[leftVarName]) {
      edges.push(genEdge(leftVarName, rightVar.name, rightVar[estimateKeyName], rightVar['P(>|z|)'], null))
    }
  }

  // 回帰の式からリンクを作成
  for (const leftVarName in regressions) {
    for (const rightVar of regressions[leftVarName]) {
      edges.push(genEdge(rightVar.name, leftVarName, rightVar[estimateKeyName], rightVar['P(>|z|)'], null))
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
    if (edge.data.group === 'cov') {
      continue
    }
    for (const node of nodes) {
      if (node.data.id === edge.data.source) node.data.value += edge.data.value
    }
  }

  return { elements: { nodes: nodes, edges: edges } }
}

@Component({
  selector: 'is-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent extends AbstractComponent implements OnChanges {
  @Input() json: any
  @Input() standardized: boolean

  cy: any

  constructor(private eref: ElementRef) {
    super()
  }

  ngOnInit() {
    this.cy = cytoscape({
      container: this.eref.nativeElement,
      style: style,
      zoomingEnabled: true,
    })
    this.cy.json(buildGraph(this.json, this.standardized))
    this.cy.layout(layout)
  }

  ngOnDestroy() {
    this.cy.destroy()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.cy) {
      this.cy.json(buildGraph(this.json, this.standardized))
      this.cy.layout(layout)
    }
  }
}
