import { Component, ViewChild } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { ContentComponent } from '../../components/content/content.component';
import { CovidDataService } from '../../covid-data.service';
//import { Recipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, ContentComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent {
  
  constructor(private recipeApiService: CovidDataService) { }

  //recipes: Recipe[] = [];

  ngOnInit() {
    this.getRecipes();
  }

  async getRecipes() {
    try {
      const response = await this.recipeApiService.getCovid19Data();
      //this.recipes = response;
    } catch (error) {
      console.error(error);
    }
  }
}
