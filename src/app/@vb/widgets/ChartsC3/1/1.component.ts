import { Component, AfterViewInit } from '@angular/core'
import c3 from 'c3'

@Component({
  selector: 'vb-charts-c3-1',
  templateUrl: './1.component.html',
  styleUrls: ['./1.component.scss'],
})
export class VbChartsC31Component implements AfterViewInit {
  ngAfterViewInit() {
    const colors = {
      primary: '#01a8fe',
      def: '#acb7bf',
      success: '#46be8a',
      danger: '#fb434a',
    }

    const simpleLine = c3.generate({
      bindto: '#simple-line',
      data: {
        columns: [
          ['Primary', 100, 165, 140, 270, 200, 140, 220],
          ['Success', 110, 80, 100, 85, 125, 90, 100],
        ],
      },
      color: {
        pattern: [colors.primary, colors.success],
      },
      axis: {
        x: {
          tick: {
            outer: !1,
          },
        },
        y: {
          max: 300,
          min: 0,
          tick: {
            outer: !1,
            count: 7,
            values: [0, 50, 100, 150, 200, 250, 300],
          },
        },
      },
      grid: {
        x: {
          show: !1,
        },
        y: {
          show: !0,
        },
      },
    })
  }
}
