import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { IFeedbackForm } from '../interfaces/forms/feedback';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { IRootState } from '../reducers/index';
import { Store } from '@ngrx/store';

@Component({
    selector: 'my-feedback-dialog',
    styles  : [ `
        form > div {
            margin-bottom : 15px;
        }

        .feedback-dialog {
            max-width : 600px;
        }

        .full-width {
            width : 100%;
        }

        textarea {
            resize : vertical;
            max-height : 300px;
        }
    
    ` ],
    template: `
        <form class="feedback-dialog">
            <div [attr.disabled]="''">
                <md-input-container class="full-width">
                    <input mdInput name="name" [(ngModel)]="model.author.name" placeholder="Name"
                           [attr.disabled]="''">
                </md-input-container>
                <md-input-container class="full-width">
                    <input mdInput name="email" [(ngModel)]="model.author.email" placeholder="Email"
                           [attr.disabled]="model.author.isAuthenticated">
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
                private store: Store<IRootState>) {
        this.model            = {
            type   : '',
            topic  : '',
            message: '',
            author : {
                name           : '',
                email          : '',
                isAuthenticated: false,
            },
            date   : null,
        };
        this.isAuthenticated$ = this.store.select(s => s.user.isAuthenticated).map(val => {
            console.log('AUTH', val);
            return val;
        });
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
        this.dialogRef.close();
        console.log(this.model);
    }
}
