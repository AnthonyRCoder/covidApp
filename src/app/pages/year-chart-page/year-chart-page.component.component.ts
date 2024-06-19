import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { ContentComponent } from '../../components/content/content.component';
import { Covid19ChartComponent } from '../../components/covid19-chart/covid19-chart.component';
@Component({
  selector: 'app-year-chart-page.component',
  standalone: true,
  imports: [HeaderComponent, ContentComponent, Covid19ChartComponent],
  templateUrl: './year-chart-page.component.component.html',
  styleUrl: './year-chart-page.component.component.scss'
})
export class YearChartPageComponentComponent {

}
