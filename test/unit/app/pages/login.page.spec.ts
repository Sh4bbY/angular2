import { LoginPage } from '../../../../src/app/pages/login.page';
import { Observable } from 'rxjs/Observable';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from '../../../../src/app/services/user.service';
import { AuthenticationService } from '../../../../src/app/services/authentication.service';
import { DebugElement } from '@angular/core';
import { MdCardModule, MdInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '../../../../src/app/reducers/index';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Page: Login Page - Isolated Tests (using fakes)', () => {
    let page: LoginPage;
    let fakeAuthenticationService: any;
    let fakeUserService: any;
    let fakeRouter: any;
    
    beforeEach(() => {
        
        fakeUserService = {
            getUser: () => Observable.of({ name: 'FAKE USER', isAuthenticated: false }),
        };
        
        fakeAuthenticationService = {
            login: () => Observable.of(false),
        };
        
        fakeRouter = {
            navigateByUrl: () => {
            },
        };
        
        page = new LoginPage(fakeAuthenticationService, fakeUserService, fakeRouter);
    });
    
    it('should work', () => {
        page.ngOnInit();
        expect(page.loading).toEqual(false);
        expect(page.responseError).toEqual(null);
    });
});


describe('Page: Login Page - Isolated Tests (using spies)', () => {
    let page: LoginPage;
    let fakeAuthenticationService: any;
    let fakeUserService: any;
    let fakeRouter: any;
    
    beforeEach(() => {
        fakeUserService           = jasmine.createSpyObj(fakeUserService, [ 'getUser' ]);
        fakeAuthenticationService = jasmine.createSpyObj(fakeAuthenticationService, [ 'login' ]);
        fakeRouter                = jasmine.createSpyObj(fakeRouter, [ 'navigateByUrl' ]);
        
        page = new LoginPage(fakeAuthenticationService, fakeUserService, fakeRouter);
    });
    
    it('should check the current user on initialization', () => {
        fakeUserService.getUser.and.returnValue(Observable.of({ isAuthenticated: false }));
        
        page.ngOnInit();
        expect(page.loading).toEqual(false);
        expect(page.responseError).toEqual(null);
        expect(fakeUserService.getUser).toHaveBeenCalled();
        expect(fakeRouter.navigateByUrl).not.toHaveBeenCalled();
    });
    
    it('should check the current user onInit and navigate to / if he is authenticated', () => {
        fakeUserService.getUser.and.returnValue(Observable.of({ isAuthenticated: true }));
        
        page.ngOnInit();
        expect(page.loading).toEqual(false);
        expect(page.responseError).toEqual(null);
        expect(fakeUserService.getUser).toHaveBeenCalled();
        expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });
    
    it('should show an error message if the login fails', () => {
        fakeUserService.getUser.and.returnValue(Observable.of({ isAuthenticated: false }));
        fakeAuthenticationService.login.and.returnValue(Observable.of(false));
        
        page.ngOnInit();
        page.model.name     = 'FAKE USER';
        page.model.password = 'FAKE PASS';
        expect(page.responseError).toEqual(null);
        page.login();
        expect(fakeAuthenticationService.login).toHaveBeenCalledWith('FAKE USER', 'FAKE PASS');
        expect(page.responseError).toEqual('Username or password is incorrect');
    });
    
    it('should handle network error properly', () => {
        fakeUserService.getUser.and.returnValue(Observable.of({ isAuthenticated: false }));
        fakeAuthenticationService.login.and.returnValue(Observable.throw('FAKE ERROR'));
        
        page.ngOnInit();
        page.model.name     = 'FAKE USER';
        page.model.password = 'FAKE PASS';
        expect(page.responseError).toEqual(null);
        page.login();
        expect(fakeAuthenticationService.login).toHaveBeenCalledWith('FAKE USER', 'FAKE PASS');
        expect(page.responseError).toEqual('FAKE ERROR');
        expect(fakeRouter.navigateByUrl).not.toHaveBeenCalled();
    });
    
    
    it('should redirect the user to / if the login succeeds', () => {
        fakeUserService.getUser.and.returnValue(Observable.of({ isAuthenticated: false }));
        fakeAuthenticationService.login.and.returnValue(Observable.of(true));
        
        page.ngOnInit();
        page.model.name     = 'FAKE USER';
        page.model.password = 'FAKE PASS';
        expect(page.responseError).toEqual(null);
        page.login();
        expect(fakeAuthenticationService.login).toHaveBeenCalledWith('FAKE USER', 'FAKE PASS');
        expect(page.responseError).toEqual(null);
        expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });
});


describe('Page: Login Page - Shallow Test', () => {
    let fixture: ComponentFixture<LoginPage>;
    let page: LoginPage;
    let de: DebugElement;
    let userService: UserService;
    let authService: AuthenticationService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [ HttpModule, FormsModule, MdCardModule, MdInputModule, StoreModule.provideStore(rootReducer),
                RouterTestingModule.withRoutes([]), NoopAnimationsModule ],
            declarations: [ LoginPage ],
            providers   : [ UserService, AuthenticationService ],
        });
        fixture     = TestBed.createComponent(LoginPage);
        page        = fixture.componentInstance;
        de          = fixture.debugElement;
        userService = TestBed.get(UserService);
        authService = TestBed.get(AuthenticationService);
    });
    
    
    it('should create the view properly', () => {
        fixture.detectChanges();
        const pageTitle = de.query(By.css('.st-title')).nativeElement;
        expect(pageTitle.textContent).toEqual('Login');
    });
    
    it('should check the current user on initialization', () => {
        spyOn(userService, 'getUser').and.returnValue(Observable.of({ isAuthenticated: false }));
        fixture.detectChanges();
    });
});
