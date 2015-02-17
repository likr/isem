function delay(msec) {
  var controlFlowExec = browser.driver.controlFlow().execute;
  // do not use arrow for using arguments
  browser.driver.controlFlow().execute = function() {
    var args = arguments;
    controlFlowExec.call(browser.driver.controlFlow(), function() {
      return protractor.promise.delayed(msec);
    });
    return controlFlowExec.apply(browser.driver.controlFlow(), args);
  };
}

delay(30);
describe('egrid-sem', () => {
  it('h1 should display 共分散構造分析.', () => {
    browser.get('/legacy/');
    var h1 = $('h1');
    expect(h1.getInnerHtml()).toBe('共分散構造分析');
  });

  it('type of #fileInput should be file.', () => {
    browser.get('/legacy/');
    var input = $('#fileInput');
    expect(input.getAttribute('type')).toBe('file');
  });

  it('fill of svg rect should be #fff.', () => {
    browser.get('/legacy/');
    var rect = $('svg rect');
    expect(rect.getAttribute('fill')).toBe('#fff');
  });

  it('text of first node should display 総合評価.', () => {
    browser.get('/legacy/');
    var firstNodeText = $('svg .contents .nodes .element text');
    expect(firstNodeText.getInnerHtml()).toBe('総合評価');
  });

  it('label of export form should display パス係数.', () => {
    browser.get('/legacy/');
    var label = $$('form').get(1).$('label');
    expect(label.getInnerHtml()).toBe('パス係数');
  });
});
