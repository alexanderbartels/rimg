import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';

import * as fs from 'fs';
import * as fx from 'mkdir-recursive';
import * as path from 'path';

import * as SVGO from 'svgo';

export class SvgoCompressionExecutor implements CommandExecutor {

    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    init(args: any) {
      return this;
    }

    process(file: string, outdir: string) {
      // setup target directory
      const target = path.join(outdir, path.normalize(file));
      fx.mkdirSync(path.dirname(target));
    
      // intiaite svgo with default configuration
      const svgo = new SVGO();

      // compress file
      const fileData = fs.readFileSync(file);
      svgo.optimize(fileData.toString(), {path: file})
        .then((result) => {
          // write sqip to svg file
          fs.writeFileSync(target, result.data);
          
          this.logger.force().println([
            '\n', file, ' -> ', target
          ]);

          const sourceSize = fs.statSync(file).size;
          const targetSize = fs.statSync(target).size;
          const reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);

          this.logger.println([
            '\t', reducedSize, "% reduced size after compression"
          ]);
        });
    }

    supportFile(file: string) {
        // Check for file extension if the given file is supported.
        return ['.svg'].indexOf(path.parse(file).ext) !== -1;
    }
}
