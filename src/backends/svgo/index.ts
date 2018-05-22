import { Options } from 'yargs';
import { Backend } from '..';
import { CompressCommandModule } from '../../commands/compress';
import { Logger } from '../../util/Logger';
import { SvgoCompressionExecutor } from './SvgoCompressionExecutor';

export class SvgoBackend extends Backend {
  public static SUPPORTED_FILE_TYPES = ['.svg'];
  private static NAME = 'svgo';
  private static SUPPORTED_COMMANDS = [CompressCommandModule.NAME];

  constructor(logger: Logger) {
    super();
    this.registerCommandExecutor(CompressCommandModule.NAME, new SvgoCompressionExecutor(logger));
  }

  public getName() {
    return SvgoBackend.NAME;
  }

  public getSupportedCommands() {
        return SvgoBackend.SUPPORTED_COMMANDS;
  }

  public getOptions(): { [flag: string]: Options } {
    return {

    };
  }
}
