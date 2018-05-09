
import * as yargs from 'yargs';
import {Argv, Options} from 'yargs';

import * as globby from 'globby';

// import parameter
import {flag as OutputFlag, option as OutputOption} from '../../parameter/output';
import {flag as BackendFlag, generateOption as generateBackendOption} from '../../parameter/backend';

import { Logger } from '../../util/Logger';
import { Backends, Backend, CommandExecutor } from '../../backends/index';
import { option } from '../../parameter/width';
import { AbstractCommandModule, AbstractCommand } from '../command';


export class SrcsetCommand extends AbstractCommand {
    constructor (name: string, logger :Logger, backends: Backends, args: any) {
        super(name, logger, backends, args);
    }
}

export class SrcsetCommandModule extends AbstractCommandModule {
    static NAME = 'srcset'

    constructor(logger: Logger, backends: Backends) {
        super(SrcsetCommandModule.NAME, logger, backends);
    }

    moduleDescription(): string {
        return 'Creates a srcset (1x and 2x resolution) for the provided images. '
                + 'Provided Image must be in 2x resolution. -1x and -2x will ' 
                + 'be appended the created files';
    }
    
    createCommand(args: any): AbstractCommand {
        return new SrcsetCommand(SrcsetCommandModule.NAME, this.logger, this.backends, args);
    }

    builder(yargs: Argv): Argv {
        return yargs;
        // TODO add custom sqip options.
    }
}
