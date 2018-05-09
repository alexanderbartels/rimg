/// <reference types="yargs" />
import { Options } from "yargs";
import { Logger } from '../util/Logger';
export interface CommandExecutor {
    init(args: any): this;
    process(file: string, outdir: string): void;
    supportFile(file: string): boolean;
}
export declare abstract class Backend {
    supportedCommands: string[];
    commandExecutors: {
        [key: string]: CommandExecutor;
    };
    constructor();
    registerCommandExecutor(command: string, executor: CommandExecutor): void;
    abstract getName(): string;
    getSupportedCommands(): string[];
    abstract getOptions(): {
        [flag: string]: Options;
    };
    hasSupport(command: string): boolean;
    createCommandExecutor(command: string, logger: Logger, args: any): CommandExecutor;
}
export declare class Backends {
    registry: {
        [key: string]: Backend;
    };
    constructor();
    registerBackend(backend: Backend): void;
    /**
     *
     * @param command
     * @ return array with backend names, that support the given command
     */
    getSupportedBackends(command: string): string[];
    getBackendsByNames(names: string[]): Backend[];
    getBackendByName(name: string): Backend | undefined;
    generateOptions(backends: string[]): {
        [flag: string]: Options;
    };
}
