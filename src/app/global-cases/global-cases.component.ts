import { Component, Input, OnInit } from '@angular/core';
import { CovidDataService } from '../covid-data.service';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { FeatureCollection, GeometryObject } from 'geojson';

interface CountryData {
  country: string;
  cases: number;
}

@Component({
  selector: 'app-global-cases',
  templateUrl: './global-cases.component.html',
  styleUrls: ['./global-cases.component.scss']
})
export class GlobalCasesComponent implements OnInit {
  @Input() countriesData: CountryData[] = [];

  constructor(private covidDataService: CovidDataService) { }

  ngOnInit(): void {
    if (this.countriesData.length === 0) {
      this.covidDataService.getCovidDataForVisualization().subscribe((data: CountryData[]) => {
        this.countriesData = data;
        this.createMap();
      });
    } else {
      this.createMap();
    }
  }

  private createMap(): void {
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const projection = d3.geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    const colorScale = d3.scaleSequential(d3.interpolateOrRd)
      .domain([0, d3.max(this.countriesData, d => d.cases)!]);

    // Fetch GeoJSON data (assuming you have it loaded or fetched separately)
    d3.json('https://d3js.org/world-110m.v1.json').then((worldData: any) => {
      const countries = worldData as FeatureCollection<GeometryObject>;

      svg.append('g')
        .selectAll('path')
        .data(countries.features)
        .enter().append('path')
        .attr('d', path)
        .attr('fill', d => {
          const country = this.countriesData.find(c => c.country === (d.properties?.['name'] ?? ''));
          return country ? colorScale(country.cases) : '#ccc';
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .append('title')
        .text(d => {
          const country = this.countriesData.find(c => c.country === (d.properties?.['name'] ?? ''));
          return country ? `${d.properties?.['name']}: ${country.cases}` : d.properties?.['name'] ?? '';
        });
    });
  }
}
