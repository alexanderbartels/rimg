"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
// import parameter
var quiet_1 = require("./parameter/quiet");
var Logger_1 = require("./util/Logger");
var index_1 = require("./backends/index");
var tinify_1 = require("./backends/tinify");
var index_2 = require("./commands/srcset/index");
var sqip_1 = require("./commands/sqip");
var index_3 = require("./commands/thumb/index");
var index_4 = require("./commands/compress/index");
var index_5 = require("./backends/primitive/index");
var logger = new Logger_1.Logger({ quiet: false });
// Backends definieren
var backends = new index_1.Backends();
backends.registerBackend(new tinify_1.TinifyBackend(logger));
backends.registerBackend(new index_5.PrimitiveBackend(logger));
var argv = yargs
    .usage('resp-img <cmd> [args]')
    // TODO use package.json via require
    .version('1.0.0')
    .epilogue('For more information, find our manual at GitHub.')
    // define global options
    .option(quiet_1.flag, quiet_1.option)
    // define commands
    .command(new index_4.CompressCommandModule(logger, backends).create())
    .command(new index_2.SrcsetCommandModule(logger, backends).create())
    .command(new index_3.ThumbCommandModule(logger, backends).create())
    .command(new sqip_1.SqipCommandModule(logger, backends).create())
    .help()
    .argv;
// update logger 
logger.quiet = argv.quiet;
//# sourceMappingURL=rimg.js.map