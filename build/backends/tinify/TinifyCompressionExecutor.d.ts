import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';
export declare class TinifyCompressionExecutor implements CommandExecutor {
    tinifyService: any;
    logger: Logger;
    constructor(logger: Logger);
    init(args: any): this;
    process(file: string, outdir: string): void;
    supportFile(file: string): boolean;
}
