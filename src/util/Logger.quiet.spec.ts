import 'mocha';  
import { expect } from 'chai';  
import * as sinon from 'sinon';  

import {Logger} from './Logger';


describe('Quiet Logger', () => {

    const logger = new Logger({
        quiet: true
    });

    beforeEach(() => {
        sinon.stub(logger.forceLogger, 'println');
        sinon.stub(logger.forceLogger, 'eprintln');
    });

    afterEach(() => {
        (logger.forceLogger.println as sinon.SinonStub).restore();
        (logger.forceLogger.eprintln as sinon.SinonStub).restore();
    });

    it('should not print messages', () => {
        logger.println(['Hello World']);
        sinon.assert.notCalled(logger.forceLogger.println as sinon.SinonStub);
        sinon.assert.notCalled(logger.forceLogger.eprintln as sinon.SinonStub);
    });

    it('should not print error messages', () => {
        logger.eprintln(['Hello World']);
        sinon.assert.notCalled(logger.forceLogger.println as sinon.SinonStub);
        sinon.assert.notCalled(logger.forceLogger.eprintln as sinon.SinonStub);
    });

    it('should have a different configured force logger to print messages in quiet mode', () => {
        /**
         * Force logger can not be quiet, so they can not be equals 
         */
        expect(logger.forceLogger).not.to.be.equals(logger);

        /* tslint:disable:no-unused-expression */
        expect(logger.forceLogger.quiet).to.be.false;
        expect(logger.quiet).to.be.true;
        /* tslint:enable:no-unused-expression */
    });

    it('should print forced error messages', () => {
        logger.force().eprintln(['Hello World']);
        sinon.assert.notCalled(logger.forceLogger.println as sinon.SinonStub);
        sinon.assert.calledOnce(logger.forceLogger.eprintln as sinon.SinonStub);
    });


    it('should print forced messages', () => {
        logger.force().println(['Hello World']);
        sinon.assert.calledOnce(logger.forceLogger.println as sinon.SinonStub);
        sinon.assert.notCalled(logger.forceLogger.eprintln as sinon.SinonStub);
    });
});