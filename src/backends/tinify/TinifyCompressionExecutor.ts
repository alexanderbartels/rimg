import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';

import * as tinify from 'tinify';
import * as fs from 'fs';
import * as fx from 'mkdir-recursive';
import * as path from 'path';

export class TinifyCompressionExecutor implements CommandExecutor {

    tinifyService: any;
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    init(args: any) {
        this.tinifyService = tinify;

        this.tinifyService.key = args['tinify-api-key'];
        if (args['tinify-proxy']) {
            this.tinifyService.proxy = args['tinify-proxy'];
        }

        return this;
    }

    process(file: string, outdir: string) {
        // setup target directory
        let target = path.join(outdir, path.normalize(file));
        fx.mkdirSync(path.dirname(target));

        // compress file
        let source = this.tinifyService.fromFile(file);
        source.toFile(target, (err :any) => {
            if (err) {
                this.logger.eprintln(['Unable to compress file: ', file]);
            } else {
                this.logger.force().println([
                        '\n', file, ' -> ', target
                ]);

                let sourceSize = fs.statSync(file).size;
                let targetSize = fs.statSync(target).size;
                let reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);

                this.logger.println([
                    '\t', reducedSize, "% reduced size after compression"
                ]);
            }
        });
    }

    supportFile(file: string) {
        // Check for file extension if the given file is supported.
        return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
    }
}