import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Resource {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-helpful-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './helpful-resources.component.html',
  styleUrls: ['./helpful-resources.component.scss']
})
export class HelpfulResourcesComponent implements OnInit {
  resources: Resource[] = [
    {
      title: 'World Health Organization (WHO)',
      description: 'Official updates and guidelines from the World Health Organization.',
      url: 'https://www.who.int'
    },
    {
      title: 'Centers for Disease Control and Prevention (CDC)',
      description: 'Latest information on COVID-19, including vaccines, testing, and guidelines.',
      url: 'https://www.cdc.gov'
    },
    {
      title: 'COVID-19 Vaccine Information',
      description: 'Find out more about COVID-19 vaccines, including availability and eligibility.',
      url: 'https://www.vaccines.gov'
    },
    {
      title: 'Johns Hopkins University COVID-19 Dashboard',
      description: 'Interactive map and statistics on the global spread of COVID-19.',
      url: 'https://coronavirus.jhu.edu/map.html'
    },
    {
      title: 'Mental Health Support',
      description: 'Resources for managing mental health during the pandemic.',
      url: 'https://www.mentalhealth.gov'
    },
    {
      title: 'Economic Support',
      description: 'Information on economic relief programs and financial support.',
      url: 'https://www.usa.gov/coronavirus'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
