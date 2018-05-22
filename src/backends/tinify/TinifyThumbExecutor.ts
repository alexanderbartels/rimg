import { AbstractCommandExecutor } from '../index';
import { Logger } from '../../util/Logger';

import * as tinify from 'tinify';
import { TinifyBackend } from '.';

export class TinifyThumbExecutor extends AbstractCommandExecutor {

    tinifyService: any;
    args: any;

    constructor (logger: Logger) {
        super(logger, TinifyBackend.SUPPORTED_FILE_TYPES);
    }

    init(args: any) {
        super.init(args);

        this.args = args;
        this.tinifyService = tinify;

        this.tinifyService.key = args['tinify-api-key'];
        if (args['tinify-proxy']) {
            this.tinifyService.proxy = args['tinify-proxy'];
        }

        return this;
    }

    process(file: string, outdir: string) {
        // setup target directory
        const target = this.setupTarget(file, {
            suffix: '-thumb'
        });

        // create thumbnail and compress file
        const source = this.tinifyService.fromFile(file);
        const thumbed = source.resize({
            method: 'thumb',
            width: this.args.width,
            height: this.args.height
        });

        thumbed.toFile(target, (err :any) => {
            if (err) {
                this.logger.eprintln(['Unable to create thumbnail for file: ', file, err]);
            } else {
                this.printSuccess(file, target);
                this.printReducedFileSize(file, target);
            }
        });
    }
}
