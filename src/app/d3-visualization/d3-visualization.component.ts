import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { CovidDataService } from '../covid-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-d3-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './d3-visualization.component.html',
  styleUrls: ['./d3-visualization.component.scss']
})
export class D3VisualizationComponent implements OnInit {
  covidData: any[] = [];
  selectedCountry: any = null;

  constructor(private covid19DataService: CovidDataService) { }

  ngOnInit(): void {
    this.covid19DataService.getCovid19Data2().subscribe(data => {
      this.covidData = data;
      this.createMap(data);
    });
  }

  private createMap(data: any): void {
    const width = 960;  // Adjusted width to allow space for the info panel
    const height = 600;

    const projection = d3.geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath()
      .projection(projection);

    const svg = d3.select('#covid19Map')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    d3.json('https://d3js.org/world-110m.v1.json').then((world: any) => {
      const countries = (topojson.feature(world, world.objects.countries) as any).features;

      const maxCases = d3.max(data, (d: any) => d.cases) as unknown as number;
      const colorScale = d3.scaleSequentialLog(d3.interpolateReds)
        .domain([1, maxCases]);

      svg.append('g')
        .selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cx', (d: any) => {
          const coords = projection([d.countryInfo.long, d.countryInfo.lat]);
          return coords ? coords[0] : 0;
        })
        .attr('cy', (d: any) => {
          const coords = projection([d.countryInfo.long, d.countryInfo.lat]);
          return coords ? coords[1] : 0;
        })
        .attr('r', (d: any) => Math.sqrt(d.cases) / 200)
        .style('fill', 'red')
        .style('opacity', 0.5)
        .on('click', (event, d) => this.highlightCountry(d))
        .append('title')
        .text((d: any) => `${d.country}: ${d.cases}`);

      svg.selectAll('circle')
        .data(data)
        .style('fill', (d: any) => {
          return this.selectedCountry && d.country === this.selectedCountry.country ? 'yellow' : 'red';
        });

      svg.append('g')
        .selectAll('path')
        .data(countries)
        .enter().append('path')
        .attr('d', path as any)
        .attr('class', 'country')
        .style('fill', 'transparent')
        .style('stroke', '#ccc');
    });
  }

  highlightCountry(country: any): void {
    this.selectedCountry = country;

    d3.selectAll('circle')
      .style('fill', (d: any) => {
        return this.selectedCountry && d.country === this.selectedCountry.country ? 'yellow' : 'red';
      });
  }

  closePanel(): void {
    this.selectedCountry = null;

     // Reset all circles to red
     d3.selectAll('circle')
     .style('fill', 'red');
  }
}
