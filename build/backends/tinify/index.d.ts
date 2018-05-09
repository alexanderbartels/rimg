/// <reference types="yargs" />
import { Backend } from '../index';
import { Options } from 'yargs';
import { Logger } from '../../util/Logger';
export declare class TinifyBackend extends Backend {
    private static NAME;
    private static SUPPORTED_COMMANDS;
    constructor(logger: Logger);
    getName(): string;
    getSupportedCommands(): string[];
    getOptions(): {
        [flag: string]: Options;
    };
}
