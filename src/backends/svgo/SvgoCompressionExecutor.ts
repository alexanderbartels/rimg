import { Logger } from '../../util/Logger';
import { AbstractCommandExecutor } from '../index';

import * as fs from 'fs';
import * as fx from 'mkdir-recursive';
import * as path from 'path';

import * as SVGO from 'svgo';
import { SvgoBackend } from '.';

export class SvgoCompressionExecutor extends AbstractCommandExecutor {
  constructor(logger: Logger) {
    super(logger, SvgoBackend.SUPPORTED_FILE_TYPES);
  }

  public process(file: string, outdir: string): void {
    // setup target directory
    const target = this.setupTarget(file, {
      suffix: '.min'
    });

    // intiaite svgo with default configuration
    const svgo = new SVGO();

    // compress file
    const fileData = fs.readFileSync(file);
    svgo.optimize(fileData.toString(), { path: file }).then((result: any) => {
      // write minified svg back to file
      fs.writeFileSync(target, result.data);

      this.printSuccess(file, target);
      this.printReducedFileSize(file, target);
    });
  }
}
