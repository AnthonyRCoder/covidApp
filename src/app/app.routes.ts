import { Routes } from '@angular/router';
import { D3VisualizationComponent } from './components/d3-visualization/d3-visualization.component';
//import { GlobalCasesComponent } from './global-cases/global-cases.component';
import { Covid19ChartComponent } from './components/covid19-chart/covid19-chart.component';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { WorldChartPageComponentComponent } from './pages/world-chart-page/world-chart-page.component.component';
import { BaseLayoutComponent } from "./layouts/base-layout/base-layout.component";
import { HelpfulResourcesComponent } from './components/helpful-resources/helpful-resources.component';
import { YearChartPageComponentComponent } from './pages/year-chart-page/year-chart-page.component.component';
import { HelpfulresourcesPageComponentComponent } from './pages/helpfulresources-page/helpfulresources-page.component.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent},
      { path: 'world', component: WorldChartPageComponentComponent },
      { path: 'year', component: YearChartPageComponentComponent },
      { path: 'helpful', component: HelpfulresourcesPageComponentComponent }
    ],
  },
 
];
