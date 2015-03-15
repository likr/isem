'use strict';
import powerAssert from 'power-assert';
import sinon from 'sinon';
const assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../mocks/browser/angular';

import {Definition} from '../../../app/src/screens/screen-network-diagram';

describe('ScreenNetworkDiagram', () => {
  describe('Definition.ddo()', () => {
    it('should be specified "&" in the all fields within "scope"', () => {
      var scopeFirstLetter = Object.keys(Definition.ddo().scope).map((key) => {
        return Definition.ddo().scope[key].slice(0, 1);
      });
      var correct = scopeFirstLetter.some((char) => {
        return char === '&';
      });
      assert(correct);
    });
  });

});