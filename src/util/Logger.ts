export interface LoggerArgs {
  quiet: boolean;
}

export class Logger {
  public quiet: boolean;

  // logger to ignore the quiet argument.
  public forceLogger: Logger;

  public stdout: Function;
  public stderr: Function;

  constructor(args: LoggerArgs) {
    this.quiet = args.quiet;

    this.forceLogger = this;
    if (this.quiet) {
      this.forceLogger = new Logger({ quiet: false });
    }

    this.stdout = console.log;
    this.stderr = console.error;
  }

  public force(): Logger {
    // force Logger only needed if quiet is true
    // so we have a nice api. e.g. this.logger.force().println();
    return this.quiet ? this.forceLogger : this;
  }

  public println(msg: string[]) {
    if (this.quiet) {
      return;
    }
    this._stdout(msg);
  }

  public eprintln(msg: string[]) {
    if (this.quiet) {
      return;
    }
    this._stderr(msg);
  }

  public _stdout(msg: string[]) {
    this.stdout.apply(console, [...msg]);
  }

  public _stderr(msg: string[]) {
    this.stderr.apply(console, ["Error: ", ...msg]);
  }
}
