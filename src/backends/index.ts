import { Options } from 'yargs';
import { Logger } from '../util/Logger';

import * as path from 'path';
import * as fs from 'fs';
import * as fx from 'mkdir-recursive';

export interface CommandExecutor {
    init(args: any): this;

    process(file: string, outdir: string): void;

    // checks if this executor can process the given file
    supportFile(file: string): boolean;
}

export interface TargetFileOptions {
    outdir?: string,
    suffix: string,
    flatten?: boolean
}

export abstract class AbstractCommandExecutor implements CommandExecutor {
    
    logger: Logger;
    supportedFileTypes: string[];
    flatten: boolean = false;
    outdir?: string;

    constructor(logger: Logger, supportedFileTypes: string[]) {
        this.logger = logger;
        this.supportedFileTypes = supportedFileTypes;
    }

    init(args: any) {
        this.outdir = args['output'];
        this.flatten = args['flatten'] || false;
        return this;
    }

    abstract process(file: string, outdir: string): void;

    supportFile(file: string) {
        return this.supportedFileTypes.indexOf(path.parse(file).ext) !== -1;
    }

    /**
     * get the target file name 
     */
    getTargetFileName(file: path.ParsedPath, opts: TargetFileOptions): string {
        return path.join(opts.outdir || '', path.format(Object.assign({}, file, {
            name: file.name + opts.suffix,
            dir: opts.flatten ? '' : file.dir,
            base: undefined
        })));
    }

    /**
     * @return #getTargetFileName()
     */
    setupTarget(file: string, opts: TargetFileOptions): string {
        const targetFileName = this.getTargetFileName(
            path.parse(path.normalize(file)), 
            Object.assign({
                outdir: this.outdir,
                flatten: this.flatten
            }, opts));

        // create needed directories
        fx.mkdirSync(path.dirname(targetFileName));
        return targetFileName;
    }

    printSuccess(inputFile: string, targetFile: string) {
        this.logger.force().println([
            '\n', inputFile, ' -> ', targetFile
        ]);
    }

    printReducedFileSize(inputFile: string, targetFile: string) {
        const sourceSize = fs.statSync(inputFile).size;
        const targetSize = fs.statSync(targetFile).size;
        const reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);

        this.logger.println([
            '\t', reducedSize, '% reduced size'
        ]);
    }
}

export abstract class Backend {

    supportedCommands: string[];
    commandExecutors: { [key :string]: CommandExecutor};

    constructor() {
        this.supportedCommands = [];
        this.commandExecutors = {};
    }

    registerCommandExecutor(command :string, executor :CommandExecutor): void {
        // if an executor is provieded, the command will be supported
        if (this.supportedCommands.indexOf(command) === -1) this.supportedCommands.push(command);
        this.commandExecutors[command] = executor;
    }

    // backend name
    abstract getName(): string;

    // commands which can be processed by the backend
    getSupportedCommands(): string[] {
        return this.supportedCommands;
    }

    // A Backend must provide its possible options
    abstract getOptions(): {[flag :string] :Options};

    // checks if a backend supports a given command
    hasSupport(command: string) {
        return this.getSupportedCommands().indexOf(command) !== -1;
    }

    // the executor that does the processing
    createCommandExecutor(command :string, logger: Logger, args: any): CommandExecutor {
        return this.commandExecutors[command].init(args);
    }
}

export class Backends {

    registry: {[key :string]: Backend};


    constructor() {
        this.registry = {};
    }

    registerBackend(backend: Backend) {
        if (this.registry[backend.getName()]) {
            throw new Error(`Backend with name ${backend.getName()} is already registered.`);
        }

        this.registry[backend.getName()] = backend;
    }

    /**
     * 
     * @param command
     * @ return array with backend names, that support the given command 
     */
    getSupportedBackends(command: string) :string[] {
        return Object.keys(this.registry).filter((backend) => {
            return this.registry[backend].hasSupport(command);
        });
    }

    getBackendsByNames(names: string[]) :Backend[] {
        return Object.keys(this.registry)
            .filter((k) => names.indexOf(k) !== -1)
            .map((k) => this.registry[k]);
    }

    getBackendByName(name: string) :Backend | undefined {
        return this.registry[name];
    }

    generateOptions(backends: string[]) :{[flag :string] :Options} {
        let opts = {};

        backends.forEach((backendName) => {
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