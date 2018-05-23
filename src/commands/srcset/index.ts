import { Argv, Options } from 'yargs';

import * as globby from 'globby';

import { Backend, Backends, CommandExecutor } from '../../backends/index';
import { Logger } from '../../util/Logger';
import { AbstractCommand, AbstractCommandModule } from '../command';

export class SrcsetCommand extends AbstractCommand {
  constructor(name: string, logger: Logger, backends: Backends, args: Argv) {
    super(name, logger, backends, args);
  }
}

export class SrcsetCommandModule extends AbstractCommandModule {
  public static NAME: string = 'srcset';

  constructor(logger: Logger, backends: Backends) {
    super(SrcsetCommandModule.NAME, logger, backends);
  }

  public moduleDescription(): string {
    return (
      'Creates a srcset (1x and 2x resolution) for the provided images. ' +
      'Provided Image must be in 2x resolution. -1x and -2x will ' +
      'be appended the created files'
    );
  }

  public createCommand(args: Argv): AbstractCommand {
    return new SrcsetCommand(
      SrcsetCommandModule.NAME,
      this.logger,
      this.backends,
      args
    );
  }

  public builder(yargs: Argv): Argv {
    return yargs;
  }
}
