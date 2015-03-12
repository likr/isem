'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
let mockCsv = {
  parse: () => {}
};

export var mockD3 = {
  csv: mockCsv
};

/* stubs */
sinon.stub(injector, 'd3').returns(mockD3);

export var stubD3 = {
  csv: {
    parse: sinon.stub(mockCsv, 'parse')
  }
};