import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { App } from '../../../src/app/app.component';
import { MaterialModule } from '../../../src/app/modules/material.module';
import { UserMenuComponent } from '../../../src/app/components/user-menu';
import { AuthService } from '../../../src/app/services/auth.service';
import { rootReducer } from '../../../src/app/reducers/index';
import 'rxjs/Rx';

describe('App', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ App, UserMenuComponent ],
            providers   : [ AuthService ],
            imports     : [
                RouterTestingModule,
                MaterialModule,
                StoreModule.provideStore(rootReducer),
            ],
        });
    });
    
    it('should work', () => {
        let fixture = TestBed.createComponent(App);
        expect(fixture.componentInstance instanceof App).toBe(true, 'should create App');
    });
});
