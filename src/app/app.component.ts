import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalCasesComponent } from "./global-cases/global-cases.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'covidApp';
}
