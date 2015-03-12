'use strict';
import powerAssert from 'power-assert';
import sinon from 'sinon';
let assert = powerAssert.customize({output: {maxDepth: 2}});

import ja from '../../../../app/src/scripts/localized/ja';
import en from '../../../../app/src/scripts/localized/en';

describe('Localized', () => {
  function getAll(localizedObject) {
    let names = Object.keys(localizedObject).map(name => name);
    let keys = names.map((name) => {
      return Object.keys(localizedObject[name]).map(key => key)
    });
    return {names, keys};
  }

  let jaNames = getAll(ja).names;
  let enNames = getAll(en).names;

  let jaAllKeys = getAll(ja).keys;
  let enAllKeys = getAll(en).keys;

  it('should be specified the directive name without shortage in all languages', () => {
    let base = jaNames.length;
    let otherLanguageLength = [
      enNames.length
    ];
    otherLanguageLength.forEach((len) => {
      assert(len === base);
    });
  });

  /**
   * @param {string} locale
   * @param {*}      allKeys
   * @returns {void}
   */
  function validationEachKeys(locale, allKeys) {
    it('should be specified each keys without shortage between ja and ' + locale, () => {
      assert.deepEqual(jaAllKeys, allKeys);
    });
  }
  validationEachKeys('en', enAllKeys);

});