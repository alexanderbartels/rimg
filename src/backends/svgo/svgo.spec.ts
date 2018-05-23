import { expect } from 'chai';
import 'mocha';

import { SvgoBackend } from '.';
import { SvgoCompressionExecutor } from './SvgoCompressionExecutor';

describe('svgo backend', () => {
  it('should have tests', () => {
    /* tslint:disable:no-unused-expression */
    expect(SvgoBackend).to.be.not.equals(undefined, '');
    expect(SvgoCompressionExecutor).to.be.not.equals(undefined, '');
    /* tslint:enable:no-unused-expression */
  });
});
