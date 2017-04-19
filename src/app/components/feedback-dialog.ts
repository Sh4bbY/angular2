import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { IFeedbackForm } from '../interfaces/forms/feedback';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'my-feedback-dialog',
    styles  : [ `
        form > div {
            margin-bottom: 15px;
        }

        .feedback-dialog {
            max-width: 600px;
        }

        .full-width {
            width: 100%;
        }

        textarea {
            resize: vertical;
            height: 100px;
        }
    
    ` ],
    template: `
        <form class="feedback-dialog">
            <div>
                <md-input-container class="full-width">
                    <input mdInput name="name" [(ngModel)]="formData.author.name" placeholder="Name"
                           [attr.disabled]="!formData.author.isAuthenticated">
                </md-input-container>
                <md-input-container class="full-width">
                    <input mdInput name="email" [(ngModel)]="formData.author.email" placeholder="Email"
                           [attr.disabled]="!formData.author.isAuthenticated">
                </md-input-container>
            </div>
            <div>
                <md-select name="type" class="full-width" [(ngModel)]="formData.type" placeholder="Feedback Type">
                    <md-option *ngFor="let type of feedbackTypes" [value]="type">
                        {{type}}
                    </md-option>
                </md-select>
            </div>
            <div>
                <md-input-container class="full-width">
                    <input mdInput name="topic" [(ngModel)]="formData.topic" placeholder="Topic">
                </md-input-container>
            </div>
            <div>
                <md-input-container class="full-width">
                    <textarea mdInput name="message" [(ngModel)]="formData.message" placeholder="Message"></textarea>
                </md-input-container>
            </div>
            <button md-raised-button (click)="onSubmitClick()" color="primary">Submit</button>
            <button md-raised-button (click)="onCancelClick()">Cancel</button>
        </form>
    `,
})
export class FeedbackDialogComponent implements OnInit {
    formData: IFeedbackForm;
    feedbackTypes: string[] = [ 'Feature-Request', 'Bug-Report', 'Something else' ];
    
    constructor(public dialogRef: MdDialogRef<FeedbackDialogComponent>,
                private authService: AuthService) {
        this.formData = {
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
    }
    
    ngOnInit() {
        this.authService.getUser().then(user => {
            this.formData.author.isAuthenticated = user.isAuthenticated;
            this.formData.author.name            = user.name;
            this.formData.author.email           = user.email;
        });
    }
    
    onCancelClick() {
        this.dialogRef.close();
    }
    
    onSubmitClick() {
        this.dialogRef.close();
        console.log(this.formData);
    }
}
