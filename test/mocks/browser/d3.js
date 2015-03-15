'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
const mockCsv = {
  parse: () => {}
};

export const mockD3 = {
  csv: mockCsv
};

/* stubs */
sinon.stub(injector, 'd3').returns(mockD3);

export const stubD3 = {
  csv: {
    parse: sinon.stub(mockCsv, 'parse')
  }
};