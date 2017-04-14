import { Component } from '@angular/core';
import '../../public/assets/css/styles.css';

@Component({
    selector: 'my-login',
    styles  : [ `
        .example-form {
            width: 300px;
        }

        .full-width {
            width: 100%;
        }` ],
    template: `
        <form class="login-form">
            <table class="full-width" cellspacing="0">
                <tr>
                    <td>
                        <md-input-container class="full-width">
                            <input mdInput placeholder="Email">
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input mdInput type="password" placeholder="Password">
                        </md-input-container>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button md-raised-button color="primary">Login</button>
                        <button md-raised-button color="accent">Register</button>
                    </td>
                </tr>
            </table>
        </form>`,
})
export class LoginPage {
}
