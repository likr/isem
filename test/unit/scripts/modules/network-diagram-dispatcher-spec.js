'use strict';
import constants from '../../../../app/src/scripts/constants';
import powerAssert from 'power-assert';
import sinon from 'sinon';
let assert = powerAssert.customize({output: {maxDepth: 2}});

import {stubRootScope} from '../../../mocks/browser/angular';
import {singleton as Dispatcher} from '../../../../app/src/scripts/modules/network-diagram-dispatcher';

describe('NetworkDiagramDispatcher', () => {
  // no tests
});