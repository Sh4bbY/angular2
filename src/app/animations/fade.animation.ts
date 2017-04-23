import { trigger, animate, transition, style } from '@angular/animations';

export const fade = trigger('fade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s', style({ opacity: 1 })),
    ]),
    /*
    transition(':leave', [
        animate('0s', style({ opacity: 0 })),
    ]),
    */
]);
