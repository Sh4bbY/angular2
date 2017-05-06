import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'my-bar-chart',
    styles  : [ `
        .d3 {
            width : 100%;
        }
    ` ],
    template: `
        <div class="d3">
            <svg class="bar-chart" #chart width="100%"
                 viewBox="0 0 ${BarChartComponent.WIDTH} ${BarChartComponent.HEIGHT}"></svg>
        </div>
    `,
})
export class BarChartComponent implements AfterViewInit {
    @ViewChild('chart') chart: ElementRef;
    @Input() data: any[];
    
    private static WIDTH  = 800;
    private static HEIGHT = 400;
    
    ngAfterViewInit() {
        if (this.data) {
            this.updateChart();
        }
    }
    
    updateChart() {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const width  = BarChartComponent.WIDTH - margin.left - margin.right;
        const height = BarChartComponent.HEIGHT - margin.top - margin.bottom;
        
        const x = d3.scaleBand().range([ 0, width ]).padding(0.1);
        const y = d3.scaleLinear().range([ height, 0 ]);
        
        const svg = d3.select(this.chart.nativeElement).append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // format the data
        this.data.forEach((d: any) => d.sales = +d.sales);
        
        // Scale the range of the data in the domains
        x.domain(this.data.map((d: any) => d.salesperson));
        y.domain([ 0, d3.max(this.data, (d: any) => d.sales) ]);
        
        // append the rectangles for the bar chart
        svg.selectAll('.bar')
            .data(this.data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (d: any) => x(d.salesperson))
            .attr('width', x.bandwidth())
            .attr('y', (d: any) => y(d.sales))
            .attr('height', (d: any) => height - y(d.sales));
        
        // add the x Axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));
        
        // add the y Axis
        svg.append('g').call(d3.axisLeft(y));
    }
}

