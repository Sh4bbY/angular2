import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import 'rxjs/Rx';
import {
    MdButtonModule, MdCardModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule,
    MdMenuModule, MdSelectModule, MdSidenavModule, MdToolbarModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavItemComponent } from '../../../src/app/components/nav-item';
import { UserMenuComponent } from '../../../src/app/components/user-menu';
import { BackToTopComponent } from '../../../src/app/components/back-to-top';
import { SearchComponent } from '../../../src/app/components/search';
import { AuthenticationService } from '../../../src/app/services/authentication.service';
import { rootReducer } from '../../../src/app/reducers/index';
import { App } from '../../../src/app/app.component';

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ App, UserMenuComponent, BackToTopComponent, NavItemComponent, SearchComponent ],
            providers   : [ AuthenticationService ],
            imports     : [
                RouterTestingModule,
                FormsModule,
                HttpModule,
                MdInputModule,
                MdIconModule,
                MdSelectModule,
                MdListModule,
                MdCardModule,
                MdButtonModule,
                MdDialogModule,
                MdMenuModule,
                MdSidenavModule,
                MdToolbarModule,
                StoreModule.provideStore(rootReducer),
            ],
        });
    });
    
    it('should work', () => {
        const fixture = TestBed.createComponent(App);
        expect(fixture.componentInstance instanceof App).toBe(true, 'should create App');
    });
});
