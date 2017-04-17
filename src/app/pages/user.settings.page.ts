import { Component } from '@angular/core';

@Component({
    selector: 'my-user-settings',
    styles  : [ `` ],
    template: `
        <h1>USER SETTINGS!</h1>
        <table>
            <tr>
                <td>name:</td>
                <td>{{name}}</td>
            </tr>
            <tr>
                <td>email:</td>
                <td>{{email}}</td>
            </tr>
        </table>
    
    `,
})
export class UserSettingsPage {
    private name: string = 'test';
    private email: string = 'emailaddr';
}
