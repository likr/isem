import { InteractiveSemPage } from './app.po';

describe('interactive-sem App', function() {
  let page: InteractiveSemPage;

  beforeEach(() => {
    page = new InteractiveSemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
