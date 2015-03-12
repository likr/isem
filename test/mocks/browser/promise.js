'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* stubs */
sinon.stub(injector, 'Promise').returns(Promise);