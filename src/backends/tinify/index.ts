import { Options } from 'yargs';
import { Logger } from '../../util/Logger';
import { Backend, CommandExecutor } from '../index';

import { CompressCommandModule } from '../../commands/compress/index';
import { SrcsetCommandModule } from '../../commands/srcset/index';
import { ThumbCommandModule } from '../../commands/thumb';
import { TinifyCompressionExecutor } from './TinifyCompressionExecutor';
import { TinifySrcsetExecutor } from './TinifySrcsetExecutor';
import { TinifyThumbExecutor } from './TinifyThumbExecutor';

export class TinifyBackend extends Backend {
  public static SUPPORTED_FILE_TYPES: string[] = ['.png', '.jpg', '.jpeg'];
  private static NAME: string = 'tinify';
  private static SUPPORTED_COMMANDS: string[] = [
    CompressCommandModule.NAME,
    SrcsetCommandModule.NAME,
    ThumbCommandModule.NAME
  ];

  constructor(logger: Logger) {
    super();

    this.registerCommandExecutor(
      CompressCommandModule.NAME,
      new TinifyCompressionExecutor(logger)
    );
    this.registerCommandExecutor(
      SrcsetCommandModule.NAME,
      new TinifySrcsetExecutor(logger)
    );
    this.registerCommandExecutor(
      ThumbCommandModule.NAME,
      new TinifyThumbExecutor(logger)
    );
  }

  public getName() {
    return TinifyBackend.NAME;
  }

  public getSupportedCommands() {
    return TinifyBackend.SUPPORTED_COMMANDS;
  }

  public getOptions(): { [flag: string]: Options } {
    return {
      'tinify-proxy': {
        describe: 'Proxy to use, to connect to the tinify services',
        type: 'string'
      },
      'tinify-api-key': {
        describe: 'API Key to get access to the tinify services',
        type: 'string'
      }
    };
  }
}
