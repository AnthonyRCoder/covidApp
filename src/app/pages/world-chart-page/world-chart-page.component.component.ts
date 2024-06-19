import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { ContentComponent } from '../../components/content/content.component';
import { D3VisualizationComponent } from '../../components/d3-visualization/d3-visualization.component';
@Component({
  selector: 'app-world-chart-page.component',
  standalone: true,
  imports: [HeaderComponent, ContentComponent, D3VisualizationComponent],
  templateUrl: './world-chart-page.component.component.html',
  styleUrl: './world-chart-page.component.component.scss'
})
export class WorldChartPageComponentComponent {

}
