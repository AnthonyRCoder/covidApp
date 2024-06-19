import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { D3VisualizationComponent } from './app/components/d3-visualization/d3-visualization.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
