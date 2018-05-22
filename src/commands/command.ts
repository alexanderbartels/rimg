
import * as yargs from 'yargs';
import {Argv, Options} from 'yargs';

import * as globby from 'globby';

// import parameter
import {flag as BackendFlag, generateOption as generateBackendOption} from './../parameter/backend';
import {flag as FlattenFlag, option as FlattenOption} from './../parameter/flatten';
import {flag as OutputFlag, option as OutputOption} from './../parameter/output';

import { Backend, Backends, CommandExecutor } from './../backends/index';
import { Logger } from './../util/Logger';

export interface Command {
    name: string;
}

export abstract class AbstractCommand implements Command {
    // command name
    public name: string;

    public logger: Logger;
    public outdir: string;
    public files: string[];

    public executors: CommandExecutor[];

    constructor(name: string, logger: Logger, backends: Backends, args: any) {
        this.name = name;
        this.logger = logger;

        // get the args we need
        this.outdir = args.output;
        this.files = globby.sync(args.files);

        this.executors = backends.getBackendsByNames(args[BackendFlag])
            .map((backend) => backend.createCommandExecutor(this.name, logger, args));
    }

    // execute the command
    public process(): void {
        // process all files
        this.files.forEach((file) => {
            this.processFile(file);
        });
    }

    public processFile(file: string): void {
        // find the first backend that supports the current file to process
        const executor = this.executors.find((e) => e.supportFile(file));

        if (executor) {
            executor.process(file, this.outdir);
        } else {
            this.logger.eprintln([' No backend from the configured ones are able to process this file: ', file]);
        }
    }
}

export abstract class AbstractCommandModule {
    // command name
    public name: string;
    public backends: Backends;
    public logger: Logger;

    constructor(name: string, logger: Logger, backends: Backends) {
        this.name = name;
        this.logger = logger;
        this.backends = backends;
    }

    // return the clid description for the module.
    public abstract moduleDescription(): string;

    // returns a new command instance
    public abstract createCommand(args: any): AbstractCommand;

    // custom command options can be appended to the argument.
    public abstract builder(argv : Argv): Argv;

    public create() : yargs.CommandModule  {
        return {
            command: `${this.name} <files>`,
            aliases: this.name,
            describe: this.moduleDescription(),
            handler: (args: any) => {
                this.createCommand(args).process();
            },
            builder: (argv: Argv) : Argv => {
                // which backends are available?
                const supportedBackends : string[] = this.backends.getSupportedBackends(this.name);

                return this.builder(yargs.positional('files', {
                    describe: 'File pattern (globby notation) for images to create the thumbnails from.',
                    type: 'string'
                })
                // support for -o --output to store the compressed images
                .option(OutputFlag, OutputOption)
                // support for -f --flatten to write all files directly to the output directory
                .option(FlattenFlag, FlattenOption)
                // support for the backend option (-b --backend). Compress uses tinify as default
                .option(BackendFlag, generateBackendOption(supportedBackends))
                // add options for supported backends
                .options(this.backends.generateOptions(supportedBackends)));
            }
        };
    }
}
