import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ContentComponent } from '../../components/content/content.component';
import { HelpfulResourcesComponent } from '../../components/helpful-resources/helpful-resources.component';
@Component({
  selector: 'app-helpfulresources-page.component',
  standalone: true,
  imports: [HeaderComponent, ContentComponent, HelpfulResourcesComponent],
  templateUrl: './helpfulresources-page.component.component.html',
  styleUrl: './helpfulresources-page.component.component.scss'
})
export class HelpfulresourcesPageComponentComponent {

}
