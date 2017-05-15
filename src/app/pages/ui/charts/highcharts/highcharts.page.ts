import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { routeAnimation } from '../../../../animations/route.animation';
import * as Highcharts from 'highcharts';
import 'highcharts/adapters/standalone-framework.src';
import { Http } from '@angular/http';

@Component({
    animations: [ routeAnimation ],
    styles    : [ `
        svg {
            width : 100% !important;
        }
    ` ],
    template  : require('./highcharts.html'),
})
export class HighchartsPage implements AfterViewInit, OnDestroy {
    @HostBinding('@routeAnimation') routeAnimation: any;
    @ViewChild('lineChartEl') lineChartEl: ElementRef;
    @ViewChild('barChartEl') barChartEl: ElementRef;
    @ViewChild('pieChartEl') pieChartEl: ElementRef;
    
    constructor(private http:Http){
    }
    
    private lineChart: any;
    private barChart: any;
    private pieChart: any;
    
    ngAfterViewInit() {
        
        this.http.get('/api/chart_data/BTC_ETH').subscribe(res => {
            this.lineChart = this.createLineChart(res.json());
        });
        this.barChart  = this.createBarChart();
        this.pieChart  = this.createPieChart();
        
        if (this.lineChart)
            this.lineChartEl.nativeElement.getElementsByTagName('svg')[ 0 ].width.baseVal.valueAsString = '100%';
        if (this.barChart)
            this.barChartEl.nativeElement.getElementsByTagName('svg')[ 0 ].width.baseVal.valueAsString = '100%';
        if (this.pieChart)
            this.pieChartEl.nativeElement.getElementsByTagName('svg')[ 0 ].width.baseVal.valueAsString = '100%';
    }
    
    ngOnDestroy() {
        if (this.lineChart) this.lineChart.destroy();
        if (this.barChart) this.barChart.destroy();
        if (this.pieChart) this.pieChart.destroy();
    }
    
    createLineChart(data:any) {
        if (!this.lineChartEl) {
            return null;
        }
        
        const opts: any = {
            xAxis : {
                type             : 'datetime',
                tickPixelInterval: 15,
            },
            series: [ {
                name: 'BTC_ETH',
                data: data,
            } ],
            chart : {
                type    : 'spline',
                style   : { width: '100%', height: 'auto' },
                width   : 800,
                height  : 400,
                renderTo: this.lineChartEl.nativeElement,
            },
        };
        
        return new Highcharts.Chart(opts);
    }
    
    
    createBarChart() {
        if (!this.barChartEl) {
            return null;
        }
        
        const opts: any = {
            yAxis : {
                tickPixelInterval: 150,
            },
            series: [ {
                name: 'Random data',
                data: generateBarData(),
            } ],
            chart : {
                type    : 'column',
                style   : { width: '100%', height: 'auto' },
                width   : 800,
                height  : 400,
                renderTo: this.barChartEl.nativeElement,
            },
        };
        
        return new Highcharts.Chart(opts);
    }
    
    
    createPieChart() {
        if (!this.pieChartEl) {
            return null;
        }
        
        const opts: any = {
            chart      : {
                type    : 'pie',
                style   : { width: '100%', height: 'auto' },
                width   : 800,
                height  : 400,
                renderTo: this.pieChartEl.nativeElement,
            },
            title      : {
                text: 'Browser market shares January, 2015 to May, 2015',
            },
            tooltip    : {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor          : 'pointer',
                    dataLabels      : {
                        enabled: true,
                        format : '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                },
            },
            series     : [ {
                name        : 'Brands',
                colorByPoint: true,
                data        : [
                    { name: 'Microsoft Internet Explorer', y: 56.33 },
                    { name: 'Chrome', y: 24.03, sliced: true, selected: true },
                    { name: 'Firefox', y: 10.38 },
                    { name: 'Safari', y: 4.77 },
                    { name: 'Opera', y: 0.91 },
                    { name: 'Proprietary or Undetectable', y: 0.2 },
                ],
            } ],
        };
        
        return new Highcharts.Chart(opts);
    }
}

function generateData() {
    const data = [];
    const time = Date.now();
    
    for (let i = 0; i < 20; i++) {
        data.push({
            x: time + i * 1000,
            y: Math.floor(Math.random() * 100),
        });
    }
    return data;
}


function generateBarData() {
    const data = [];
    
    for (let i = 0; i < 20; i++) {
        data.push({
            x: i,
            y: Math.floor(Math.random() * 100),
        });
    }
    return data;
}
