import {Component, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'
import {getEstimateKeyName} from './estimate-key-name'

// const groupToAllowShape = (group) => {
//   return (group === 'cov') ? 'triangle' : 'circle'
// }
//
// const valueToSize = (value) => {
//   // 0..10 to 30..90
//   return 6 * value + 30
// }
//
// const colorMap = 'mapData(p, 1, 0, #ecf0f1, #e74c3c)'
//
// const style = cytoscape.stylesheet()
//   .selector('node')
//     .css({
//       'content': 'data(name)',
//       'width': (ele) => {
//         const c = (ele.data('group') === 'obs') ? 2 : 1
//         return c * valueToSize(ele.data('value'))
//       },
//       'height': (ele) => valueToSize(ele.data('value')),
//       'shape': (ele) => groupToShape(ele.data('group')),
//       'text-valign': 'center',
//       'color': 'white',
//       'text-outline-width': 2,
//       'font-weight': 300,
//       'text-outline-color': (ele) => groupToColor(ele.data('group')),
//       'background-color': (ele) => groupToColor(ele.data('group'))
//     })
//   .selector('edge')
//     .css({
//       'label': 'data(value)',
//       'text-outline-width': 2,
//       'font-size': '0.8em',
//       'curve-style': 'bezier',
//       'target-arrow-shape': 'triangle',
//       'source-arrow-shape': (ele) => groupToAllowShape(ele.data('group')),
//       'text-outline-color': colorMap,
//       'line-color': colorMap,
//       'source-arrow-color': colorMap,
//       'target-arrow-color': colorMap,
//       'width': 'mapData(value, 0, 1, 1, 10)'
//     })

const linkColorScale = d3.scaleLinear()
  .domain([0, 1])
  .range(['#e74c3c', '#ecf0f1'])

const linkWidthScale = d3.scaleLinear()
  .domain([0, 1])
  .range([1, 10])

const genNode = (name) => {
  return {
    id: name,
    label: name,
    width: 120,
    height: 20,
    value: 0
  }
}

const genLink = (sourceVar, targetVar, value, p, group) => {
  return {
    source: sourceVar,
    target: targetVar,
    stroke: linkColorScale(+p),
    strokeWidth: linkWidthScale(+value)
  }
}

const buildGraph = (json, standardized) => {
  const { covariances, regressions, names } = json
  const lantentVariables = json.latent_variables
  const nodes = []
  const links = []
  const estimateKeyName = getEstimateKeyName(standardized)

  for (const name of names.obs) {
    nodes.push(Object.assign(genNode(name), {
      type: 'rect',
      fill: '#16a085'
    }))
  }
  for (const name of names.lat) {
    nodes.push(Object.assign(genNode(name), {
      type: 'circle',
      fill: '#2980b9'
    }))
  }

  // 潜在変数の定義式より、リンクを作成
  for (const leftVarName in lantentVariables) {
    for (const rightVar of lantentVariables[leftVarName]) {
      links.push(genLink(leftVarName, rightVar.name, rightVar[estimateKeyName], rightVar['P(>|z|)'], null))
    }
  }

  // 回帰の式からリンクを作成
  for (const leftVarName in regressions) {
    for (const rightVar of regressions[leftVarName]) {
      links.push(genLink(rightVar.name, leftVarName, rightVar[estimateKeyName], rightVar['P(>|z|)'], null))
    }
  }

  // 共分散のリンクを作成
  for (const leftVarName in covariances) {
    for (const rightVar of covariances[leftVarName]) {
      links.push(genLink(leftVarName, rightVar.name, rightVar[estimateKeyName], rightVar['P(>|z|)'], 'cov'))
    }
  }

  // 直接効果の合計を計算
  for (const edge of links) {
    if (edge.group === 'cov') {
      continue
    }
    for (const node of nodes) {
      if (node.id === edge.source) node.value += edge.value
    }
  }

  return {nodes, links}
}

@Component({
  selector: 'is-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent extends AbstractComponent implements OnChanges {
  @Input() json: any
  @Input() standardized: boolean

  constructor(private eref: ElementRef) {
    super()
  }

  ngOnInit() {
    const elem = this.eref.nativeElement
    const renderer = elem.querySelector('eg-renderer')
    renderer.setAttribute('width', elem.clientWidth)
    renderer.setAttribute('height', elem.clientHeight)

    window.addEventListener('resize', () => {
      renderer.setAttribute('width', elem.clientWidth)
      renderer.setAttribute('height', elem.clientHeight)
    })
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.json.names) {
      const elem = this.eref.nativeElement
      const renderer = elem.querySelector('eg-renderer')
      const data = buildGraph(this.json, this.standardized)
      renderer.load(data)
    }
  }
}
