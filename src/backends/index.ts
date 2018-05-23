import { Argv, Options } from 'yargs';
import { Logger } from '../util/Logger';

import * as fs from 'fs';
import * as fx from 'mkdir-recursive';
import * as path from 'path';

export interface CommandExecutor {
  init(args: any): this;

  process(file: string, outdir: string): void;

  // checks if this executor can process the given file
  supportFile(file: string): boolean;
}

export interface TargetFileOptions {
  outdir?: string;
  suffix: string;
  flatten?: boolean;
}

export abstract class AbstractCommandExecutor implements CommandExecutor {
  public logger: Logger;
  public supportedFileTypes: string[];
  public flatten: boolean = false;
  public outdir?: string;

  constructor(logger: Logger, supportedFileTypes: string[]) {
    this.logger = logger;
    this.supportedFileTypes = supportedFileTypes;
  }

  public init(args: any): this {
    this.outdir = args.output;
    this.flatten = args.flatten || false;

    return this;
  }

  public abstract process(file: string, outdir: string): void;

  public supportFile(file: string): boolean {
    return this.supportedFileTypes.indexOf(path.parse(file).ext) !== -1;
  }

  /**
   * get the target file name
   */
  public getTargetFileName(
    file: path.ParsedPath,
    opts: TargetFileOptions
  ): string {
    return path.join(
      opts.outdir || '',
      path.format({
        ...file,
        name: file.name + opts.suffix,
        dir: opts.flatten ? '' : file.dir,
        base: undefined
      })
    );
  }

  /**
   * @return #getTargetFileName()
   */
  public setupTarget(file: string, opts: TargetFileOptions): string {
    const targetFileName = this.getTargetFileName(
      path.parse(path.normalize(file)),
      {
        outdir: this.outdir,
        flatten: this.flatten,
        ...opts
      }
    );

    // create needed directories
    fx.mkdirSync(path.dirname(targetFileName));

    return targetFileName;
  }

  public printSuccess(inputFile: string, targetFile: string): void {
    this.logger.force().println(['\n', inputFile, ' -> ', targetFile]);
  }

  public printReducedFileSize(inputFile: string, targetFile: string): void {
    const sourceSize = fs.statSync(inputFile).size;
    const targetSize = fs.statSync(targetFile).size;
    const reducedSize = (100 - targetSize * 100 / sourceSize).toFixed(2);

    this.logger.println(['\t', reducedSize, '% reduced size']);
  }
}

export abstract class Backend {
  public supportedCommands: string[];
  public commandExecutors: { [key: string]: CommandExecutor };

  constructor() {
    this.supportedCommands = [];
    this.commandExecutors = {};
  }

  public registerCommandExecutor(
    command: string,
    executor: CommandExecutor
  ): void {
    // if an executor is provieded, the command will be supported
    if (this.supportedCommands.indexOf(command) === -1) {
      this.supportedCommands.push(command);
    }
    this.commandExecutors[command] = executor;
  }

  // backend name
  public abstract getName(): string;

  // commands which can be processed by the backend
  public getSupportedCommands(): string[] {
    return this.supportedCommands;
  }

  // A Backend must provide its possible options
  public abstract getOptions(): { [flag: string]: Options };

  // checks if a backend supports a given command
  public hasSupport(command: string): boolean {
    return this.getSupportedCommands().indexOf(command) !== -1;
  }

  // the executor that does the processing
  public createCommandExecutor(
    command: string,
    logger: Logger,
    args: any
  ): CommandExecutor {
    return this.commandExecutors[command].init(args);
  }
}

export class Backends {
  public registry: { [key: string]: Backend };

  constructor() {
    this.registry = {};
  }

  public registerBackend(backend: Backend): void {
    if (this.registry[backend.getName()]) {
      throw new Error(
        `Backend with name ${backend.getName()} is already registered.`
      );
    }

    this.registry[backend.getName()] = backend;
  }

  // return array with backend names, that support the given command
  public getSupportedBackends(command: string): string[] {
    return Object.keys(this.registry).filter(backend => {
      return this.registry[backend].hasSupport(command);
    });
  }

  public getBackendsByNames(names: string[]): Backend[] {
    return Object.keys(this.registry)
      .filter(k => names.indexOf(k) !== -1)
      .map(k => this.registry[k]);
  }

  public getBackendByName(name: string): Backend | undefined {
    return this.registry[name];
  }

  public generateOptions(backends: string[]): { [flag: string]: Options } {
    let opts = {};

    backends.forEach(backendName => {
      const backend = this.getBackendByName(backendName);
      if (backend) {
        opts = {
          ...opts,
          ...backend.getOptions()
        };
      }
    });

    return opts;
  }
}
