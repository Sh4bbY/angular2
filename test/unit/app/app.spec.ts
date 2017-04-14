import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from '../../../client/src/app';
import { MaterialModule } from '../../../client/material.module';

describe('App', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [App], imports: [
            RouterTestingModule,
            MaterialModule
        ]});
    });
    
    it('should work', () => {
        let fixture = TestBed.createComponent(App);
        expect(fixture.componentInstance instanceof App).toBe(true, 'should create App');
    });
});
