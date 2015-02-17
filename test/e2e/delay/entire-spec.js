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

delay(100);
describe('spec need a few delay', () => {
  it('when without click remove button, checkbox should be checked.', () => {
    browser.get('/legacy/');
    var firstCheckbox = $('label.checkbox.ng-binding input');
    expect(firstCheckbox.isSelected()).toBe(true);
  });

  it('when click remove button, checkbox should be unchecked.', () => {
    browser.get('/legacy/');
    var firstNodeRemoveButton = $('svg .contents .nodes .element .removeNodeButton');
    firstNodeRemoveButton.click();

    var firstCheckbox = $('label.checkbox.ng-binding input');
    expect(firstCheckbox.isSelected()).toBe(false);
  });
});