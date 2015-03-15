'use strict';
import constants from '../../../../app/src/scripts/constants';
import powerAssert from 'power-assert';
import sinon from 'sinon';
const assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../../mocks/browser/angular';

import {Controller} from '../../../../app/src/views/gui/new-latent-variable';

describe('GuiNewLatentVariable', () => {
  describe('Controller#createNewLatentVariableName()', () => {
    function parameterized(expected, labels) {
      var result = Controller.createNewLatentVariableName(labels, def());
      it('should be returned "' + expected + '" when there are ' + JSON.stringify(labels), () => {
        assert(result === expected);
      });
    }

    function def(n) {
      const defaultName = 'Untitled';
      if (!n) {return defaultName}
      return [defaultName, n].join(' ');
    }

    parameterized(def(),  ['a']);
    parameterized(def(2), [def()]);
    parameterized(def(),  [def(1)]);
    parameterized(def(),  [def(2)]);

    parameterized(def(),  ['a', 'b']);
    parameterized(def(2), [def(), 'b']);
    parameterized(def(2), ['a', def()]);
    parameterized(def(),  [def(1), 'b']);
    parameterized(def(),  ['a', def(1)]);
    parameterized(def(),  [def(2), 'b']);
    parameterized(def(),  ['a', def(2)]);
    parameterized(def(3), [def(), def(2)]);
    parameterized(def(3), [def(2), def()]);

    parameterized(def(),  ['a', 'b', 'c']);
    parameterized(def(2), [def(), 'b', 'c']);
    parameterized(def(2), ['a', def(), 'c']);
    parameterized(def(2), ['a', 'b', def()]);
    parameterized(def(),  [def(1), 'b', 'c']);
    parameterized(def(),  [def(2), 'b', 'c']);

    parameterized(def(3), [def(), def(2), 'c']);
    parameterized(def(3), [def(2), def(), 'c']);

    parameterized(def(),  [def(2), def(3), def(4), def(5)]);
    parameterized(def(2), [def(),  def(3), def(4), def(5)]);
    parameterized(def(3), [def(2), def(),  def(4), def(5)]);
    parameterized(def(4), [def(2), def(3), def(),  def(5)]);
    parameterized(def(5), [def(2), def(3), def(4), def()]);

    parameterized(def(3), [def(), def(2), def(4), def(6)]);
    parameterized(def(4), [def(), def(2), def(3), def(6)]);

    parameterized(def(3), [def(), def(2), def('3foo')]);
    parameterized(def(3), [def(), def(2), def('3 foo')]);

    var largeTest = (() => {
      var expected = def(11);
      var labels = [];
      for (let i = 10; 1 < i; i--) {
        labels.push(def(i));
      }
      labels.push(def());

      var result = Controller.createNewLatentVariableName(labels, def());
      it('should be returned "' + expected + '" when there are 10 serialized', () => {
        assert(result === expected);
      });
    })();
  });

});