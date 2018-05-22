import { Logger } from '../../util/Logger';
import { AbstractCommandExecutor, CommandExecutor } from '../index';

import * as sizeOf from 'image-size';
import * as tinify from 'tinify';
import { TinifyBackend } from '.';

export class TinifySrcsetExecutor extends AbstractCommandExecutor {

   public tinifyService: any;

    constructor (logger: Logger) {
        super(logger, TinifyBackend.SUPPORTED_FILE_TYPES);
    }

    public init (args: any) {
        super.init(args);

        this.tinifyService = tinify;
        this.tinifyService.key = args['tinify-api-key'];
        if (args['tinify-proxy']) {
            this.tinifyService.proxy = args['tinify-proxy'];
        }

        return this;
    }

    public processReady(err: any, file : string, targetX1 : string, targetX2 : string) {
        if (err) {
            this.logger.eprintln(['Unable to compress file: ', file, err]);
        } else {
            this.printSuccess(file, targetX1);
            this.printReducedFileSize(file, targetX1);

            this.printSuccess(file, targetX2);
            this.printReducedFileSize(file, targetX2);
        }
    }

   public toFile(tinifySource: any, targetFile: string): Promise<any> {
       return new Promise((resolve, reject) => {
           tinifySource.toFile(targetFile, (err: any) => {
               if (err) {
                   reject(err);
               } else {
                   resolve();
               }
           });
       });
   }

   public process(file: string, outdir: string) {
       // TODO target is with -1x appended.
       const targetX1 = this.setupTarget(file, { suffix: '-@1x' });
       const targetX2 = this.setupTarget(file, { suffix: '-@2x' });

       // get width from the input image
       const inputWidth = sizeOf(file).width;
       const targetWidth = Math.round(inputWidth / 2);

       // compress and resize file
       const source = this.tinifyService.fromFile(file);
       const resized = source.resize({
           method: 'scale',
           width: targetWidth
       });

       Promise.all([
           this.toFile(resized, targetX1),
           this.toFile(source, targetX2)
       ]).then(() => {
           this.processReady(null, file, targetX1, targetX2);
       },      (err: any) => {
           this.processReady(err, file, targetX1, targetX2);
       });
   }
}
