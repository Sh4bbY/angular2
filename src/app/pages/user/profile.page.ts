import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { routeAnimation } from '../../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    template  : `
        <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <div class="st-content-top clearfix">
                <h1 class="st-title">User Profile</h1>
            </div>

            <md-card>

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
            </md-card>
        </div>
    `,
})
export class UserProfilePage implements OnInit {
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
