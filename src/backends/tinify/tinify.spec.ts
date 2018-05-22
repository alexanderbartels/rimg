
import { expect } from 'chai';
import 'mocha';

import {TinifyBackend} from '.';
import {TinifyCompressionExecutor} from './TinifyCompressionExecutor';
import {TinifySrcsetExecutor} from './TinifySrcsetExecutor';
import {TinifyThumbExecutor} from './TinifyThumbExecutor';

describe('tinify backend', () => {
    it('should have tests', () => {
        // TODO provide some tests

        /* tslint:disable:no-unused-expression */
        expect(TinifyBackend).to.be.not.undefined;
        expect(TinifyCompressionExecutor).to.be.not.undefined;
        expect(TinifySrcsetExecutor).to.be.not.undefined;
        expect(TinifyThumbExecutor).to.be.not.undefined;
        /* tslint:enable:no-unused-expression */
    });
});
