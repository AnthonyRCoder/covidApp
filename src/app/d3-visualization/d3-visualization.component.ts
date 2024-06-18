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
  covidData: any[] = [];  // Array to hold COVID-19 data
  selectedCountry: any = null;  // To store selected country data

  constructor(private covid19DataService: CovidDataService) { }

  ngOnInit(): void {
    this.covid19DataService.getCovid19Data2().subscribe(data => {
      this.covidData = data;  // Store fetched data
      this.createMap(data);   // Call function to create map
    });
  }

  private createMap(data: any): void {
    const width = 1260;
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

    // Load and display the World
    d3.json('https://d3js.org/world-110m.v1.json').then((world: any) => {
      const countries = (topojson.feature(world, world.objects.countries) as any).features;

      // Define color scale before using it
      const maxCases = d3.max(data, (d: any) => d.cases) as unknown as number; // Ensure maxCases is a number
      const colorScale = d3.scaleSequentialLog(d3.interpolateReds)
        .domain([1, maxCases]);

      // Add circles for all COVID-19 data
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
        .append('title')
        .text((d: any) => `${d.country}: ${d.cases}`);

      // Update circles based on selected country
      svg.selectAll('circle')
        .data(data)
        .style('fill', (d: any) => {
          return this.selectedCountry && d.country === this.selectedCountry.country ? 'yellow' : 'red';
        });

      // Draw map borders
      svg.append('g')
        .selectAll('path')
        .data(countries)
        .enter().append('path')
        .attr('d', path as any)  // Type assertion for 'path'
        .attr('class', 'country')
        .style('fill', 'transparent')
        .style('stroke', '#ccc');
    });
  }

  highlightCountry(country: any): void {
    this.selectedCountry = country;

    // Redraw circles with updated selection
    d3.selectAll('circle')
      .style('fill', (d: any) => {
        return this.selectedCountry && d.country === this.selectedCountry.country ? 'yellow' : 'red';
      });
  }
}