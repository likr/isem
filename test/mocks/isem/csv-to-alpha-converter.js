'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockConverter() {}
mockConverter.convert = () => {};

export var dummyResult = {
  nodes: [
    'dummyNodes1',
    'dummyNodes2',
    'dummyNodes3'
  ],
  S: [
    [1, 2],
    [3, 4],
    [5, 6]
  ]
};

/* stubs */
sinon.stub(injector, 'CsvToAlphaConverter').returns(mockConverter);

export var stubConverter = {
  convert: sinon.stub(mockConverter, 'convert').returns(dummyResult)
};