import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { IRootState } from '../reducers/index';
import { Store } from '@ngrx/store';
import { FeedbackService } from '../services/feedback.service';

@Component({
    selector: 'my-feedback-dialog',
    styles  : [ `
        form > div {
            margin-bottom : 15px;
        }

        .feedback-dialog {
            max-width : 600px;
        }

        textarea {
            max-height : 300px;
        }
    
    ` ],
    template: `
        <form class="feedback-dialog">
            <div [attr.disabled]="''">
                <md-input-container class="full-width">
                    <input mdInput name="name" [(ngModel)]="model.author.name" placeholder="Name"
                           [disabled]="model.author.isAuthenticated">
                </md-input-container>
                <md-input-container class="full-width">
                    <input mdInput name="email" [(ngModel)]="model.author.email" placeholder="Email"
                           [disabled]="model.author.isAuthenticated">
                </md-input-container>
            </div>
            <div>
                <md-select name="type" class="full-width" [(ngModel)]="model.type" placeholder="Feedback Type">
                    <md-option *ngFor="let type of feedbackTypes" [value]="type">
                        {{type}}
                    </md-option>
                </md-select>
            </div>
            <div>
                <md-input-container class="full-width">
                    <input mdInput name="topic" [(ngModel)]="model.topic" placeholder="Topic">
                </md-input-container>
            </div>
            <div>
                <md-input-container class="full-width">
                    <textarea mdInput name="message" [(ngModel)]="model.message" placeholder="Message"
                              maxLength="250" [rows]="3" md-select-on-focus></textarea>
                    <md-hint align="end">{{model.message.length}} / 100</md-hint>
                </md-input-container>
            </div>
            <button md-raised-button (click)="onSubmitClick()" color="primary">Submit</button>
            <button md-raised-button (click)="onCancelClick()">Cancel</button>
        </form>
    `,
})
export class FeedbackDialogComponent implements OnInit {
    model: any;
    feedbackTypes: string[] = [ 'Feature-Request', 'Bug-Report', 'Something else' ];
    isAuthenticated$: Observable<boolean>;
    
    constructor(public dialogRef: MdDialogRef<FeedbackDialogComponent>,
                private userService: UserService,
                private store: Store<IRootState>,
                private feedbackService: FeedbackService) {
        this.model            = {};
        this.model.author     = {};
        this.model.message    = '';
        this.isAuthenticated$ = this.store.select(s => s.user.isAuthenticated);
    }
    
    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            this.model.author.isAuthenticated = user.isAuthenticated;
            this.model.author.name            = user.name;
            this.model.author.email           = user.email;
        });
    }
    
    onCancelClick() {
        this.dialogRef.close();
    }
    
    onSubmitClick() {
        this.feedbackService.create(this.model)
            .subscribe(
                data => this.dialogRef.close(),
                err => console.error('ERROR ', err),
            );
    }
}
