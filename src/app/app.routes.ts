import { Routes } from '@angular/router';
import { D3VisualizationComponent } from './d3-visualization/d3-visualization.component';
import { GlobalCasesComponent } from './global-cases/global-cases.component';
import { Covid19ChartComponent } from './covid19-chart/covid19-chart.component';

export const routes: Routes = [
  { path: '', component: D3VisualizationComponent },
  { path: 'c', component: Covid19ChartComponent}
];
