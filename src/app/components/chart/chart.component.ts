import {Component, Input, ElementRef} from '@angular/core';
import {ObservedVariableVm} from '../../application/variable/observed-variable-vm'
import {GoogleChartsService} from '../../services/google-charts.service'
import {AbstractComponent} from '../abstract/abstract.component'

@Component({
  selector: 'is-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent extends AbstractComponent {
  @Input() variable: ObservedVariableVm

  constructor(private googleCharts: GoogleChartsService, private eref: ElementRef) {
    super()
  }

  ngOnInit() {
    this.googleCharts.load().then((google) => {
      const data : any = [['index', 'value']]
      this.variable.values.forEach((v, i) => {
        data.push([i.toString(), v])
      })
      const dataTable = google.visualization.arrayToDataTable(data)
      const chart = new google.visualization.Histogram(this.eref.nativeElement)
      chart.draw(dataTable, {
        title: this.variable.key,
        legend: {
          position: 'none'
        },
      })
    })
  }
}
