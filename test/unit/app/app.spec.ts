import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from '../../../src/app/app';
import { MaterialModule } from '../../../src/material.module';
import { UserMenuComponent } from '../../../src/app/components/usermenu';
import { StoreModule } from '@ngrx/store';
import { user } from '../../../src/app/common/stores/user.store';
import { AuthService } from '../../../src/app/common/services/auth.service';

describe('App', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ App, UserMenuComponent ],
            providers   : [ AuthService ],
            imports     : [
                RouterTestingModule,
                MaterialModule,
                StoreModule.provideStore({ user }),
            ],
        });
    });
    
    it('should work', () => {
        let fixture = TestBed.createComponent(App);
        expect(fixture.componentInstance instanceof App).toBe(true, 'should create App');
    });
});
