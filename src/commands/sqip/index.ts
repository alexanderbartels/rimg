
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
import { AbstractCommand, AbstractCommandModule } from '../command';


export class SqipCommand extends AbstractCommand {
    constructor (name: string, logger :Logger, backends: Backends, args: any) {
        super(name, logger, backends, args);
    }

    process () {
        // process all files
        this.files.forEach((file) => {

            // find the first backend that supports the current file to process
            const executor = this.executors.find((e) => e.supportFile(file));

            if(executor) {
                executor.process(file, this.outdir);
            } else {
                this.logger.eprintln([" No backend from the configured ones are able to process this file: ", file]);
            }
        });
    }
}

export class SqipCommandModule extends AbstractCommandModule {
    static NAME = 'sqip'

    constructor(logger: Logger, backends: Backends) {
        super(SqipCommandModule.NAME, logger, backends);
    }

    moduleDescription(): string {
        return 'Generates a svg placeholder image using the sqip method'
    }
    
    createCommand(args: any): AbstractCommand {
        return new SqipCommand(SqipCommandModule.NAME, this.logger, this.backends, args);
    }

    builder(yargs: Argv): Argv {
        return yargs;
        // TODO add custom sqip options.
    }
}
