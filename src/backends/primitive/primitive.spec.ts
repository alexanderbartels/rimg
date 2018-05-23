import { expect } from 'chai';
import 'mocha';

import { PrimitiveBackend } from '.';
import { SqipExecutor } from './SqipExecutor';

describe('primitive backend', () => {
  it('should have tests', () => {
    /* tslint:disable:no-unused-expression */
    expect(PrimitiveBackend).to.be.not.equals(undefined, '');
    expect(SqipExecutor).to.be.not.equals(undefined, '');
    /* tslint:enable:no-unused-expression */
  });
});
