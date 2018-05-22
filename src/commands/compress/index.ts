import * as yargs from "yargs";
import { Argv, Options } from "yargs";

import * as globby from "globby";

// import parameter
import {
  flag as BackendFlag,
  generateOption as generateBackendOption
} from "../../parameter/backend";
import {
  flag as OutputFlag,
  option as OutputOption
} from "../../parameter/output";

import { Backend, Backends, CommandExecutor } from "../../backends/index";
import { Logger } from "../../util/Logger";
import { AbstractCommand, AbstractCommandModule } from "../command";

export class CompressCommand extends AbstractCommand {
  constructor(name: string, logger: Logger, backends: Backends, args: any) {
    super(name, logger, backends, args);
  }
}

export class CompressCommandModule extends AbstractCommandModule {
  public static NAME = "compress";

  constructor(logger: Logger, backends: Backends) {
    super(CompressCommandModule.NAME, logger, backends);
  }

  public moduleDescription(): string {
    return "Compresses the provided images with the goal to reach as small image files as possible";
  }

  public createCommand(args: any): AbstractCommand {
    return new CompressCommand(
      CompressCommandModule.NAME,
      this.logger,
      this.backends,
      args
    );
  }

  public builder(yargs: Argv): Argv {
    return yargs;
  }
}
