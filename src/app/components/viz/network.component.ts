import {Component, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'

@Component({
  selector: 'is-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent extends AbstractComponent implements OnChanges {
  @Input() graph: any

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

  ngOnChanges(changes: SimpleChanges) {
    const renderer = this.eref.nativeElement
      .querySelector('eg-renderer-ogdf')
      .load(this.graph)
  }
}
