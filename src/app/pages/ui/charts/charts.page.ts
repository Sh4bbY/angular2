import { Component } from '@angular/core';
import { routeAnimation } from '../../../animations/route.animation';

@Component({
    selector  : 'my-charts',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles    : [ require('./charts.scss') ],
    template  : require('./charts.html'),
})
export class ChartsPage {
    barChart: Array<any>;
    pieChart: Array<any>;
    
    constructor() {
        this.barChart = [
            { salesperson: 'Bob', sales: '33' },
            { salesperson: 'Robin', sales: '12' },
            { salesperson: 'Anne', sales: '41' },
            { salesperson: 'Mark', sales: '16' },
            { salesperson: 'Joe', sales: '59' },
            { salesperson: 'Eve', sales: '38' },
            { salesperson: 'Karen', sales: '21' },
            { salesperson: 'Kirsty', sales: '25' },
            { salesperson: 'Chris', sales: '30' },
            { salesperson: 'Lisa', sales: '47' },
            { salesperson: 'Tom', sales: '5' },
            { salesperson: 'Stacy', sales: '20' },
            { salesperson: 'Charles', sales: '13' },
            { salesperson: 'Mary', sales: '29' },
        ];
        
        this.pieChart = [
            { age: '<5', population: 2704659 },
            { age: '5-13', population: 4499890 },
            { age: '14-17', population: 2159981 },
            { age: '18-24', population: 3853788 },
            { age: '25-44', population: 14106543 },
            { age: '45-64', population: 8819342 },
            { age: '≥65', population: 612463 },
        ];
    }
}
