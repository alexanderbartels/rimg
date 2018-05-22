import * as fs from "fs";
import * as fx from "mkdir-recursive";
import * as path from "path";
import * as sqip from "sqip";
import { PrimitiveBackend } from ".";
import { Logger } from "../../util/Logger";
import { AbstractCommandExecutor, CommandExecutor } from "../index";

export class SqipExecutor extends AbstractCommandExecutor {
  public args: any;

  constructor(logger: Logger) {
    super(logger, PrimitiveBackend.SUPPORTED_FILE_TYPES);
  }

  public init(args: any) {
    this.args = args;
    return super.init(args);
  }

  public process(file: string, outdir: string) {
    // setup target directory
    const target = this.setupTarget(file, {
      suffix: "-sqip"
    });

    // create sqip image
    const result = sqip({
      filename: file,
      numberOfPrimitives: this.args["primitive-count"],
      mode: this.args["primitive-mode"],
      blur: this.args["primitive-blur"]
    });

    // write sqip to svg file
    fs.writeFileSync(target, result.final_svg);

    this.printSuccess(file, target);
    this.printReducedFileSize(file, target);
    this.logger.println([
      "\n\t SVG as Base64: ",
      "[",
      result.img_dimensions.width,
      "px x ",
      result.img_dimensions.height,
      "px] ",
      result.svg_base64encoded
    ]);
  }
}
