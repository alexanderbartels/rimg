/// <reference types="node" />
import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';
import * as path from 'path';
export declare class TinifySrcsetExecutor implements CommandExecutor {
    tinifyService: any;
    logger: Logger;
    constructor(logger: Logger);
    init(args: any): this;
    getTargetFileName(outdir: string, file: path.ParsedPath, suffix: string): string;
    processReady(err: any, file: string, targetX1: string, targetX2: string): void;
    toFile(tinifySource: any, targetFile: string): Promise<any>;
    process(file: string, outdir: string): void;
    supportFile(file: string): boolean;
}
