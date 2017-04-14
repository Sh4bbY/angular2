import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from '../../../client/src/app';

describe('App', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [App], imports: [RouterTestingModule]});
    });
    
    it('should work', () => {
        let fixture = TestBed.createComponent(App);
        expect(fixture.componentInstance instanceof App).toBe(true, 'should create App');
    });
});
