import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'my-pie-chart',
    styles  : [ `
        .d3 {
            width : 100%;
        }
    ` ],
    template: `
        <div class="d3">
            <svg class="pie-chart" #chart width="100%"
                 viewBox="0 0 ${PieChartComponent.WIDTH} ${PieChartComponent.HEIGHT}"></svg>
        </div>
    `,
})
export class PieChartComponent implements AfterViewInit {
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
        const width  = PieChartComponent.WIDTH - margin.left - margin.right;
        const height = PieChartComponent.HEIGHT - margin.top - margin.bottom;
        
        const x = d3.scaleBand().range([ 0, width ]).padding(0.1);
        const y = d3.scaleLinear().range([ height, 0 ]);
        
        const svg    = d3.select(this.chart.nativeElement);
        const radius = Math.min(width, height) / 2;
        const g      = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        
        const color = d3.scaleOrdinal([ '#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00' ]);
        
        const pie = d3.pie().sort(null).value((d: any) => d.population);
        
        const path: any = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);
        
        const label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);
        
        
        const arc = g.selectAll('.arc')
            .data(pie(this.data))
            .enter().append('g')
            .attr('class', 'arc');
        
        arc.append('path')
            .attr('d', path)
            .attr('fill', (d: any) => color(d.data.age));
        
        arc.append('text')
            .attr('transform', (d: any) => `translate(${label.centroid(d)})`)
            .attr('dy', '0.35em')
            .text((d: any) => d.data.age);
    }
}

