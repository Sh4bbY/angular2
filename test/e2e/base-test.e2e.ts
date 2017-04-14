import { browser } from 'protractor';

describe('App', () => {
    
    beforeEach(() => {
        browser.get('/');
    });
    
    const expectedTitle = 'Angular With Webpack';
    it(`should have title "${expectedTitle}"`, () => {
        browser.getTitle().then(title => expect(title).toEqual(expectedTitle));
    });
});
