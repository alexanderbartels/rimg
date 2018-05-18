import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';

import * as tinify from 'tinify';
import * as fs from 'fs';
import * as fx from 'mkdir-recursive';
import * as path from 'path';
import * as sizeOf from 'image-size';

export class TinifySrcsetExecutor implements CommandExecutor {

   tinifyService: any;
   logger: Logger;

   constructor (logger: Logger) {
    this.logger = logger;
   }

   init (args: any) {
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

   processReady(err: any, file :string, targetX1 :string, targetX2 :string) {
       if (err) {
           this.logger.eprintln(['Unable to compress file: ', file, err]);
       } else {
           this.logger.force().println([
                   '\n', file, ' -> [', targetX1, ', ', targetX2, ']',
           ]);

           const sourceSize = fs.statSync(file).size;
           const targetX1Size = fs.statSync(targetX1).size;
           const targetX2Size = fs.statSync(targetX2).size;

           const reducedX1Size = (100 - (targetX1Size * 100 / sourceSize)).toFixed(2);
           const reducedX2Size = (100 - (targetX2Size * 100 / sourceSize)).toFixed(2);

           this.logger.println([
               '\t',  reducedX1Size, '% reduced file size for -1x',
               '\n\t', reducedX2Size, '% reduced file size for -2x'
           ]);
       }
   }

   toFile(tinifySource: any, targetFile: string): Promise<any> {
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

   process(file: string, outdir: string) {
       // TODO target is with -1x appended. 
       const parsedPath = path.parse(path.normalize(file));
       const targetX1 = this.getTargetFileName(outdir, parsedPath, '-1x');
       const targetX2 = this.getTargetFileName(outdir, parsedPath, '-2x');

       // setup target directory
       fx.mkdirSync(path.dirname(targetX1));

       // get width from the input image
       const inputWidth = sizeOf(file).width;
       const targetWidth = Math.round(inputWidth / 2);

       // compress and resize file
       const source = this.tinifyService.fromFile(file);
       const resized = source.resize({
           method: "scale",
           width: targetWidth,
       });

       Promise.all([
           this.toFile(resized, targetX1),
           this.toFile(source, targetX2)
       ]).then(() => {
           this.processReady(null, file, targetX1, targetX2);
       }, (err: any) => {
           this.processReady(err, file, targetX1, targetX2);
       });
   }

   supportFile(file: string) {
       // Check for file extension if the given file is supported.
       return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
   }
}


