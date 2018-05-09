/// <reference types="yargs" />
import { Argv } from 'yargs';
import { Logger } from '../../util/Logger';
import { Backends } from '../../backends/index';
import { AbstractCommand, AbstractCommandModule } from '../command';
export declare class SqipCommand extends AbstractCommand {
    constructor(name: string, logger: Logger, backends: Backends, args: any);
    process(): void;
}
export declare class SqipCommandModule extends AbstractCommandModule {
    static NAME: string;
    constructor(logger: Logger, backends: Backends);
    moduleDescription(): string;
    createCommand(args: any): AbstractCommand;
    builder(yargs: Argv): Argv;
}
