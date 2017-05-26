import { trigger, animate, transition, style } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
    transition(':enter', [
        style({ position: 'absolute', width: '100%', opacity: 0, transform: 'translateX(-150%)' }),
        animate('.4s ease', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
    
    transition(':leave', [
        animate('.4s ease', style({ position: 'absolute', opacity: 0, transform: 'translateX(150%)' })),
    ]),
]);
