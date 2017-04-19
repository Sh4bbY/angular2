import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'my-user-settings',
    styles  : [ `` ],
    template: `
        <h1>USER SETTINGS!</h1>
        <table>
            <tr>
                <td>name:</td>
                <td>{{formData.name}}</td>
            </tr>
            <tr>
                <td>email:</td>
                <td>{{formData.email}}</td>
            </tr>
            <tr>
                <td>id:</td>
                <td>{{formData.id}}</td>
            </tr>
            <tr>
                <td>createdAt:</td>
                <td>{{formData.createdAt}}</td>
            </tr>
        </table>
    
    `,
})
export class UserProfilePage implements OnInit {
    formData: any;
    
    constructor(private authService: AuthService) {
        this.formData = { id: '', name: '' };
    }
    
    ngOnInit() {
        this.authService.getUser().then(user => {
            this.formData.id        = user.id;
            this.formData.name      = user.name;
            this.formData.email     = user.email;
            this.formData.createdAt = user.createdAt;
        });
    }
}
