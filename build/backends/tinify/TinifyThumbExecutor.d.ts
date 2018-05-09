/// <reference types="node" />
import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';
import * as path from 'path';
export declare class TinifyThumbExecutor implements CommandExecutor {
    tinifyService: any;
    logger: Logger;
    args: any;
    constructor(logger: Logger);
    init(args: any): this;
    getTargetFileName(outdir: string, file: path.ParsedPath, suffix: string): string;
    process(file: string, outdir: string): void;
    supportFile(file: string): boolean;
}
