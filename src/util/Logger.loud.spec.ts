import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import { Logger } from "./Logger";

describe("Loud Logger", () => {
  const logger = new Logger({
    quiet: false
  });

  beforeEach(() => {
    sinon.stub(logger.forceLogger, "println");
    sinon.stub(logger.forceLogger, "eprintln");
  });

  afterEach(() => {
    (logger.forceLogger.println as sinon.SinonStub).restore();
    (logger.forceLogger.eprintln as sinon.SinonStub).restore();
  });

  it("should print messages", () => {
    logger.println(["Hello World"]);

    // forced logger is a self reference so it should be called once
    sinon.assert.calledOnce(logger.forceLogger.println as sinon.SinonStub);
    sinon.assert.notCalled(logger.forceLogger.eprintln as sinon.SinonStub);
  });

  it("should print error messages", () => {
    logger.eprintln(["Hello World"]);

    // forced logger is a self reference so it should be called once
    sinon.assert.calledOnce(logger.forceLogger.eprintln as sinon.SinonStub);
    sinon.assert.notCalled(logger.forceLogger.println as sinon.SinonStub);
  });

  it("should have the the forced logger defined as self reference", () => {
    expect(logger.forceLogger).to.be.equals(logger);
  });

  it("should print forced error messages", () => {
    logger.force().eprintln(["Hello World"]);
    sinon.assert.notCalled(logger.forceLogger.println as sinon.SinonStub);
    sinon.assert.calledOnce(logger.forceLogger.eprintln as sinon.SinonStub);
  });

  it("should print forced messages", () => {
    logger.force().println(["Hello World"]);
    sinon.assert.calledOnce(logger.forceLogger.println as sinon.SinonStub);
    sinon.assert.notCalled(logger.forceLogger.eprintln as sinon.SinonStub);
  });
});
