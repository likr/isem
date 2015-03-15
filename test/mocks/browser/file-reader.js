'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockFileReader() {}
mockFileReader.prototype.readAsText = () => {};

/* stubs */
sinon.stub(injector, 'FileReader').returns(mockFileReader);

export const stubFileReader = {
  readAsText: sinon.stub(mockFileReader.prototype, 'readAsText')
};