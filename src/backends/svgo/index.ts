import { Backend } from "..";
import { CompressCommandModule } from "../../commands/compress";
import { Options } from "yargs";
import { SvgoCompressionExecutor } from "./SvgoCompressionExecutor";
import { Logger } from "../../util/Logger";


 export class SvgoBackend extends Backend {
  private static NAME = 'svgo';
  private static SUPPORTED_COMMANDS = [CompressCommandModule.NAME];

  constructor(logger: Logger) {
    super();
    this.registerCommandExecutor(CompressCommandModule.NAME, new SvgoCompressionExecutor(logger));
  }

  getName() {
    return SvgoBackend.NAME;
  }

  getSupportedCommands() {
        return SvgoBackend.SUPPORTED_COMMANDS;
  }

  getOptions():  { [flag: string]: Options } {
    return {
      
    };
  }
}
