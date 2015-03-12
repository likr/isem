'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockConverter() {}
mockConverter.convert = () => {};

export var dummyResult = {
  labels: [
    'dummyNodes1',
    'dummyNodes2',
    'dummyNodes3'
  ],
  dataArray: [
    [1, 2],
    [3, 4],
    [5, 6]
  ]
};

/* stubs */
sinon.stub(injector, 'CsvToEgridConverter').returns(mockConverter);

export var stubConverter = {
  convert: sinon.stub(mockConverter, 'convert').returns(dummyResult)
};