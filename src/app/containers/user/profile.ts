import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'my-user-profile',
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
export class UserProfileComponent implements OnInit {
    formData: any;
    
    constructor(private userService: UserService) {
        this.formData = { id: '', name: '' };
    }
    
    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            this.formData.id        = user.id;
            this.formData.name      = user.name;
            this.formData.email     = user.email;
            this.formData.createdAt = user.createdAt;
        });
    }
}
