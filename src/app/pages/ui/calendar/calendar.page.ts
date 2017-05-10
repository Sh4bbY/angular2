import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { routeAnimation } from '../../../animations/route.animation';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';

const colors: any = {
    red   : {
        primary  : '#ad2121',
        secondary: '#FAE3E3',
    },
    blue  : {
        primary  : '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary  : '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
    animations   : [ routeAnimation ],
    template     : require('./calendar.html'),
    styles       : [ require('./calendar.scss') ],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarPage {
    @HostBinding('@routeAnimation') routeAnimation: any;
    
    refresh: Subject<any>    = new Subject();
    viewDate: Date           = new Date();
    view: string             = 'month';
    activeDayIsOpen: boolean = true;
    
    actions: CalendarEventAction[] = [ {
        label  : '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
        },
    }, {
        label  : '<i class="fa fa-fw fa-times"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
        },
    } ];
    events: CalendarEvent[]        = [ {
        start  : subDays(startOfDay(new Date()), 1),
        end    : addDays(new Date(), 1),
        title  : 'A 3 day event',
        color  : colors.red,
        actions: this.actions,
    }, {
        start  : startOfDay(new Date()),
        title  : 'An event with no end date',
        color  : colors.yellow,
        actions: this.actions,
    }, {
        start: subDays(endOfMonth(new Date()), 3),
        end  : addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        color: colors.blue,
    }, {
        start    : addHours(startOfDay(new Date()), 2),
        end      : new Date(),
        title    : 'A draggable and resizable event',
        color    : colors.yellow,
        actions  : this.actions,
        resizable: {
            beforeStart: true,
            afterEnd   : true,
        },
        draggable: true,
    } ];
    
    modalData: {
        action: string,
        event: CalendarEvent,
    };
    
    
    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        console.log(action, event);
    }
    
    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end   = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }
    
    addEvent(): void {
        this.events.push({
            title    : 'New event',
            start    : startOfDay(new Date()),
            end      : endOfDay(new Date()),
            color    : colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd   : true,
            },
        });
        this.refresh.next();
    }
    
    dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate        = date;
            }
        }
    }
}
