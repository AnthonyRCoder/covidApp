import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-visualization',
  standalone: true,
  imports: [],
  templateUrl: './d3-visualization.component.html',
  styleUrl: './d3-visualization.component.scss'
})
export class D3VisualizationComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const data = [30, 86, 168, 281, 303, 365];

    const svg = d3.select(this.el.nativeElement).select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        barWidth = width / data.length;

    const bar = svg.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", (d, i) => `translate(${i * barWidth}, 0)`);

    bar.append("rect")
        .attr("y", d => height - d)
        .attr("height", d => d)
        .attr("width", barWidth - 1);

    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", d => height - d - 5)
        .attr("dy", ".75em")
        .text(d => d);
  }
}
