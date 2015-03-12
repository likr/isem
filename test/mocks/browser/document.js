'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockDocumnt() {}
mockDocumnt.getElementById = () => {};
mockDocumnt.querySelectorAll = () => {};

/* stubs */
sinon.stub(injector, 'document').returns(mockDocumnt);

export var stubDocument = {
  getElementById:   sinon.stub(mockDocumnt, 'getElementById'),
  querySelectorAll: sinon.stub(mockDocumnt, 'querySelectorAll')
};