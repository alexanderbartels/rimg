import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';
import * as path from 'path';

export class SvgoCompressionExecutor implements CommandExecutor {

    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    init(args: any) {
      return this;
    }

    process(file: string, outdir: string) {
      // TODO ... 
      this.logger.println([file, ' svgo compression']);
    }

    supportFile(file: string) {
        // Check for file extension if the given file is supported.
        return ['.svg'].indexOf(path.parse(file).ext) !== -1;
    }
}
