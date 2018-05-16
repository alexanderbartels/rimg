#!/usr/bin/env node

import * as yargs from 'yargs';
import {Argv, Options} from 'yargs';

// import parameter
import {flag as QuietFlag, option as QuietOption} from './parameter/quiet';

// import commands 
import {CompressCommand} from './commands/compress';

import {Logger} from './util/Logger';
import { Backends } from './backends/index';
import { TinifyBackend } from './backends/tinify';
import { SrcsetCommand, SrcsetCommandModule } from './commands/srcset/index';
import { ThumbCommand } from './commands/thumb';
import { SqipCommandModule } from './commands/sqip';
import { ThumbCommandModule } from './commands/thumb/index';
import { CompressCommandModule } from './commands/compress/index';
import { PrimitiveBackend } from './backends/primitive/index';


const logger = new Logger({quiet: false});

// Backends definieren
const backends = new Backends();
backends.registerBackend(new TinifyBackend(logger));
backends.registerBackend(new PrimitiveBackend(logger));

const argv = yargs
    .usage('resp-img <cmd> [args]')
    // TODO use package.json via require
    .version('1.0.0')
    .epilogue('For more information, find our manual at GitHub.')

    // define global options
    .option(QuietFlag, QuietOption)

    // define commands
    .command(new CompressCommandModule(logger, backends).create())
    .command(new SrcsetCommandModule(logger, backends).create())
    .command(new ThumbCommandModule(logger, backends).create())
    .command(new SqipCommandModule(logger, backends).create())

    .help()
    .argv;

// update logger 
logger.quiet = argv.quiet;
