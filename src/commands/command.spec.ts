import { expect } from 'chai';
import 'mocha';

import { AbstractCommand } from './command';

describe('Command', () => {
  it('should have tests', () => {
    /* tslint:disable:no-unused-expression */
    expect(AbstractCommand).to.be.not.equals(
      undefined,
      'AbstractCommand should be defined'
    );
    /* tslint:enable:no-unused-expression */
  });
});
