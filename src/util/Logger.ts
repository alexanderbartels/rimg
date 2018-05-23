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

  public println(msg: string[]): void {
    if (this.quiet) {
      return;
    }
    this._stdout(msg);
  }

  public eprintln(msg: string[]): void {
    if (this.quiet) {
      return;
    }
    this._stderr(msg);
  }

  private _stdout(msg: string[]): void {
    this.stdout.apply(console, [...msg]);
  }

  private _stderr(msg: string[]): void {
    this.stderr.apply(console, ['Error: ', ...msg]);
  }
}
