import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';

import * as tinify from 'tinify';
import * as fs from 'fs';
import * as fx from 'mkdir-recursive';
import * as path from 'path';

export class TinifyThumbExecutor implements CommandExecutor {

    tinifyService: any;
    logger: Logger;

    args: any;

    constructor (logger: Logger) {
        this.logger = logger;
    }

    init(args: any) {
        this.args = args;
        this.tinifyService = tinify;

        this.tinifyService.key = args['tinify-api-key'];
        if (args['tinify-proxy']) {
            this.tinifyService.proxy = args['tinify-proxy'];
        }

        return this;
    }

    getTargetFileName(outdir: string, file: path.ParsedPath, suffix: string): string {
        return path.join(outdir, path.format(Object.assign({}, file, {
            name: file.name + suffix,
            base: undefined
        })));
    }

    process(file: string, outdir: string) {
        // setup target directory
        let target = this.getTargetFileName(outdir, path.parse(path.normalize(file)), '-thumb');
        fx.mkdirSync(path.dirname(target));

        // compress file
        let source = this.tinifyService.fromFile(file);
        let thumbed = source.resize({
            method: "thumb",
            width: this.args.width,
            height: this.args.height
        });
        thumbed.toFile(target, (err :any) => {
            if (err) {
                this.logger.eprintln(['Unable to create thumbnail for file: ', file, err]);
            } else {
                this.logger.force().println([
                        '\n', file, ' -> ', target
                ]);

                let sourceSize = fs.statSync(file).size;
                let targetSize = fs.statSync(target).size;
                let reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);

                this.logger.println([
                    '\t', reducedSize, "% reduced size through thumbnail creation"
                ]);
            }
        });
    }

    supportFile(file: string) {
        // Check for file extension if the given file is supported.
        return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
    }
 }
