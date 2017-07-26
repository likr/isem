import {Component, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'
import {getEstimateKeyName} from './estimate-key-name'

const linkColorScale = d3.scaleLinear()
  .domain([0, 1])
  .range(['#e74c3c', '#ecf0f1'])

const linkWidthScale = d3.scaleLinear()
  .domain([0, 1])
  .range([1, 10])

const genLink = (sourceVar, targetVar, value, p, group) => {
  const width = linkWidthScale(Math.abs(value))
  return {
    source: sourceVar,
    target: targetVar,
    label: value.toFixed(3),
    color: linkColorScale(p),
    strokeWidth: width,
    sourceMarkerShape: group == 'cov' ? 'triangle' : 'circle',
    sourceMarkerSize: 2 * width,
    targetMarkerShape: 'triangle',
    targetMarkerSize: 2 * width
  }
}

const buildGraph = (json, standardized) => {
  const { covariances, regressions, names } = json
  const lantentVariables = json.latent_variables
  const nodes = []
  const links = []
  const estimateKeyName = getEstimateKeyName(standardized)

  for (const name of names.obs) {
    nodes.push({
      name,
      type: 'rect',
      fillColor: '#16a085',
      labelStrokeColor: '#16a085'
    })
  }
  for (const name of names.lat) {
    nodes.push({
      name,
      type: 'circle',
      fillColor: '#2980b9',
      labelStrokeColor: '#2980b9'
    })
  }

  // 潜在変数の定義式より、リンクを作成
  for (const leftVarName in lantentVariables) {
    for (const rightVar of lantentVariables[leftVarName]) {
      links.push(genLink(leftVarName, rightVar.name, +rightVar[estimateKeyName], +rightVar['P(>|z|)'], null))
    }
  }

  // 回帰の式からリンクを作成
  for (const leftVarName in regressions) {
    for (const rightVar of regressions[leftVarName]) {
      links.push(genLink(rightVar.name, leftVarName, +rightVar[estimateKeyName], +rightVar['P(>|z|)'], null))
    }
  }

  // 共分散のリンクを作成
  for (const leftVarName in covariances) {
    for (const rightVar of covariances[leftVarName]) {
      links.push(genLink(leftVarName, rightVar.name, +rightVar[estimateKeyName], +rightVar['P(>|z|)'], 'cov'))
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
    const renderer = elem.querySelector('eg-renderer-ogdf')
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
      const renderer = elem.querySelector('eg-renderer-ogdf')
      const data = buildGraph(this.json, this.standardized)
      renderer.load(data)
    }
  }
}
