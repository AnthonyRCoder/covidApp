import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.scss']
})
export class CovidChartComponent implements OnInit {

  data: any[] = []; // Array to store COVID-19 data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Fetch COVID-19 data
    this.http.get<any[]>('https://disease.sh/v3/covid-19/countries').subscribe(data => {
      // Store data and create chart
      this.data = data;
      this.createChart();
    }, error => {
      console.error('Error fetching COVID-19 data:', error);
    });
  }

  createChart(): void {
    // Using D3 for visualization
    const svg = d3.select('#covid-chart').append('svg')
      .attr('width', 800)
      .attr('height', 600);

    // Extracting necessary data for visualization
    const countries = this.data.map(d => d.country);
    const cases = this.data.map(d => d.cases);

    // Setting up scales
    const xScale = d3.scaleBand()
      .domain(countries)
      .range([80, 700])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(cases)!])
      .range([500, 100]);

    // Adding bars
    svg.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.country)!)
      .attr('y', d => yScale(d.cases))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 500 - yScale(d.cases))
      .attr('fill', 'steelblue');

    // Adding labels
    svg.selectAll('.label')
      .data(this.data)
      .enter().append('text')
      .attr('class', 'label')
      .text(d => d.cases)
      .attr('x', d => xScale(d.country)! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.cases) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', 'white');
  }
}
