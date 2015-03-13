'use strict';
import powerAssert from 'power-assert';
import sinon from 'sinon';
const assert = powerAssert.customize({output: {maxDepth: 2}});

import ja from '../../../../app/src/scripts/localized/ja';
import en from '../../../../app/src/scripts/localized/en';

describe('Localized', () => {
  function getAll(localizedObject) {
    var names = Object.keys(localizedObject).map(name => name);
    var keys = names.map((name) => {
      return Object.keys(localizedObject[name]).map(key => key)
    });
    return {names, keys};
  }

  var jaNames = getAll(ja).names;
  var enNames = getAll(en).names;

  var jaAllKeys = getAll(ja).keys;
  var enAllKeys = getAll(en).keys;

  it('should be specified the directive name without shortage in all languages', () => {
    var base = jaNames.length;
    var otherLanguageLength = [
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