import { Component, HostBinding } from '@angular/core';
import { routeAnimation } from '../../../animations/route.animation';

// just an interface for type safety.
interface IMarker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}

@Component({
    animations: [ routeAnimation ],
    styles    : [ `
        agm-map {
            height : 400px;
            width  : 100%;
        }
    ` ],
    template  : require('./maps.html'),
})
export class MapsPage {
    @HostBinding('@routeAnimation') routeAnimation:any;
    
    markers: IMarker[] = [ {
        lat      : 51.673858,
        lng      : 7.815982,
        label    : 'A',
        draggable: true,
    }, {
        lat      : 51.373858,
        lng      : 7.215982,
        label    : 'B',
        draggable: false,
    }, {
        lat      : 51.723858,
        lng      : 7.895982,
        label    : 'C',
        draggable: true,
    } ];
    
    // google maps zoom level
    zoom: number = 8;
    
    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;
    
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }
    
    mapClicked($event: any) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
        });
    }
    
    markerDragEnd(m: IMarker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }
}
