
import * as yargs from 'yargs';
import {Argv, Options} from 'yargs';

import * as globby from 'globby';

// import parameter
import {flag as OutputFlag, option as OutputOption} from '../../parameter/output';
import {flag as BackendFlag, generateOption as generateBackendOption} from '../../parameter/backend';
import {flag as WidthFlag, option as WidthOption} from '../../parameter/width';
import {flag as HeightFlag, option as HeightOption} from '../../parameter/height';

import { Logger } from '../../util/Logger';
import { Backends, Backend, CommandExecutor } from '../../backends/index';
import { option } from '../../parameter/width';
import { AbstractCommandModule, AbstractCommand } from '../command';


export class ThumbCommand extends AbstractCommand {
    constructor (name: string, logger :Logger, backends: Backends, args: any) {
        super(name, logger, backends, args);
    }
}

export class ThumbCommandModule extends AbstractCommandModule {
    static NAME = 'thumb';

    constructor(logger: Logger, backends: Backends) {
        super(ThumbCommandModule.NAME, logger, backends);
    }

    moduleDescription(): string {
        return 'Creates a thumbnail for the provided images.';
    }
    
    createCommand(args: any): AbstractCommand {
        return new ThumbCommand(ThumbCommandModule.NAME, this.logger, this.backends, args);
    }

    builder(yargs: Argv): Argv {
        return yargs
            // add options for witdh and height
            .option(WidthFlag, WidthOption)
            .option(HeightFlag, HeightOption);
    }
}
