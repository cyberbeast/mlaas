import { MlaasPage } from './app.po';

describe('mlaas App', function() {
  let page: MlaasPage;

  beforeEach(() => {
    page = new MlaasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
