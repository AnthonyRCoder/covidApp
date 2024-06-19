import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { CovidDataService } from '../../covid-data.service';
import { HeaderComponent } from '../header/header.component';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-covid19-chart',
  standalone: true,
  imports: [HeaderComponent, ContentComponent],
  templateUrl: './covid19-chart.component.html',
  styleUrls: ['./covid19-chart.component.scss']
})
export class Covid19ChartComponent implements OnInit {

  constructor(private covid19DataService: CovidDataService) { }

  ngOnInit(): void {
    this.covid19DataService.getCovidDataForVisualization().subscribe(data => {
      this.createChart(data);
    });
  }

  private createChart(data: any): void {
    const parseDate = d3.timeParse('%m/%d/%y');
  
    // Parse the data for cases, deaths, and recovered
    const casesData = Object.keys(data.cases).map(key => ({
      date: parseDate(key),
      cases: data.cases[key],
      deaths: data.deaths[key],
      recovered: data.recovered[key]
    })).filter(d => d.date !== null) as { date: Date, cases: number, deaths: number, recovered: number }[];
  
    const margin = { top: 20, right: 30, bottom: 40, left: 70 },
          width = 900 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select('#covid19Chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleTime()
      .domain(d3.extent(casesData, d => d.date) as [Date, Date])
      .range([0, width]);
  
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    // Adjust the y scale domain to fit the desired range
const maxYValue = d3.max(casesData, d => Math.max(d.cases, d.deaths, d.recovered)) as number;
const y = d3.scaleLinear()
  .domain([0, maxYValue]) // Update the domain as needed
  .nice()
  .range([height, 0]);

// Format the y-axis ticks to display in millions
const yAxis = d3.axisLeft(y)
  .tickFormat(d3.format(".2s")); // Format for millions (e.g., 100M, 200M, ...)

// Append the y-axis to the SVG
svg.append('g')
  .attr('class', 'y-axis')
  .call(yAxis);

// Update the Y Axis label to reflect the change in units
svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', -margin.left + 20)
  .attr('text-anchor', 'middle')
  .text('Count (in millions)'); // Update the label text

  
    const lineCases = d3.line<{ date: Date, cases: number, deaths: number, recovered: number }>()
      .x(d => x(d.date) as number)
      .y(d => y(d.cases));
  
    const lineDeaths = d3.line<{ date: Date, cases: number, deaths: number, recovered: number }>()
      .x(d => x(d.date) as number)
      .y(d => y(d.deaths));
  
    const lineRecovered = d3.line<{ date: Date, cases: number, deaths: number, recovered: number }>()
      .x(d => x(d.date) as number)
      .y(d => y(d.recovered));
    console.log(data);
  
    // Draw the cases line
    svg.append('path')
      .datum(casesData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', lineCases);
  
    // Draw the deaths line
    svg.append('path')
      .datum(casesData)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', lineDeaths);
  
    // Draw the recovered line
    svg.append('path')
      .datum(casesData)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1.5)
      .attr('d', lineRecovered);
  
    // Add the X Axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Date');
  
    // Add the Y Axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('text-anchor', 'middle');
  
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 400}, 10)`);
  
    legend.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'steelblue');
    legend.append('text')
      .attr('x', 20)
      .attr('y', 10)
      .text('Cases')
      .attr('alignment-baseline', 'middle');
  
    legend.append('rect')
      .attr('y', 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'red');
    legend.append('text')
      .attr('x', 20)
      .attr('y', 30)
      .text('Deaths')
      .attr('alignment-baseline', 'middle');
  
    legend.append('rect')
      .attr('y', 40)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'green');
    legend.append('text')
      .attr('x', 20)
      .attr('y', 50)
      .text('Recovered')
      .attr('alignment-baseline', 'middle');
  }
}
