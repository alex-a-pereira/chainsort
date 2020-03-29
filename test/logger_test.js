import { expect } from 'chai';
import sinon from 'sinon';

import logger from '../src/logger';

describe('Logger', () => {
  describe('import Logger', () => {
    it('should export as a singleton', () => {
      let subject1 = logger;
      subject1.stupidTmpProperty = 'junk data to make sure it exists in subject2';
      let subject2 = logger;
      expect(subject1.stupidTmpProperty).to.eq(subject2.stupidTmpProperty);
    });
  });

  describe('logging functions', () => {
    beforeEach(() => { sinon.stub(logger, '_log'); });
    afterEach(() => { sinon.restore(); });

    ['verbose', 'debug', 'info', 'warn', 'error'].forEach(logFuncName => {
      let logLevelString = logFuncName.toUpperCase();
      describe(logFuncName, () => {
        it(`should call _log with ${logLevelString} and the rest of the given arguments`, () => {
          logger[logFuncName](1, 2);
          sinon.assert.calledWithExactly(logger._log, logLevelString, 1, 2);
        });
      });
    });
  });
});
