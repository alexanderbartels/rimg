/// <reference types="yargs" />
import { Argv } from 'yargs';
import { Logger } from '../../util/Logger';
import { Backends } from '../../backends/index';
import { AbstractCommandModule, AbstractCommand } from '../command';
export declare class CompressCommand extends AbstractCommand {
    constructor(name: string, logger: Logger, backends: Backends, args: any);
}
export declare class CompressCommandModule extends AbstractCommandModule {
    static NAME: string;
    constructor(logger: Logger, backends: Backends);
    moduleDescription(): string;
    createCommand(args: any): AbstractCommand;
    builder(yargs: Argv): Argv;
}
