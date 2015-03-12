'use strict';
import powerAssert from 'power-assert';
import sinon from 'sinon';
let assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../mocks/browser/angular';

import {Definition} from '../../../app/src/screens/screen-network-diagram';

describe('ScreenNetworkDiagram', () => {
  describe('Definition.ddo()', () => {
    it('should be specified "&" in the all fields within "scope"', () => {
      let scopeFirstLetter = Object.keys(Definition.ddo().scope).map((key) => {
        return Definition.ddo().scope[key].slice(0, 1);
      });
      let correct = scopeFirstLetter.some((char) => {
        return char === '&';
      });
      assert(correct);
    });
  });

});