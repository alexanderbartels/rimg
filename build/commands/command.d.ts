/// <reference types="yargs" />
import * as yargs from 'yargs';
import { Argv } from 'yargs';
import { Logger } from './../util/Logger';
import { Backends, CommandExecutor } from './../backends/index';
export interface Command {
    name: string;
}
export declare abstract class AbstractCommand implements Command {
    name: string;
    logger: Logger;
    outdir: string;
    files: string[];
    executors: CommandExecutor[];
    constructor(name: string, logger: Logger, backends: Backends, args: any);
    process(): void;
    processFile(file: string): void;
}
export declare abstract class AbstractCommandModule {
    name: string;
    backends: Backends;
    logger: Logger;
    constructor(name: string, logger: Logger, backends: Backends);
    abstract moduleDescription(): string;
    abstract createCommand(args: any): AbstractCommand;
    abstract builder(argv: Argv): Argv;
    create(): yargs.CommandModule;
}
