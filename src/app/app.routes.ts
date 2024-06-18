import { Routes } from '@angular/router';
import { D3VisualizationComponent } from './d3-visualization/d3-visualization.component';
//import { GlobalCasesComponent } from './global-cases/global-cases.component';
import { Covid19ChartComponent } from './covid19-chart/covid19-chart.component';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { BaseLayoutComponent } from "./layouts/base-layout/base-layout.component";
import { HelpfulResourcesComponent } from './helpful-resources/helpful-resources.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent},
      { path: 'world', component: D3VisualizationComponent },
      { path: 'year', component: Covid19ChartComponent },
      { path: 'helpful', component: HelpfulResourcesComponent }
    ],
  },
 
];
