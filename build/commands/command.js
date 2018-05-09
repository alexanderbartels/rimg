"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var globby = require("globby");
// import parameter
var output_1 = require("./../parameter/output");
var backend_1 = require("./../parameter/backend");
var AbstractCommand = /** @class */ (function () {
    function AbstractCommand(name, logger, backends, args) {
        var _this = this;
        this.name = name;
        this.logger = logger;
        // get the args we need 
        this.outdir = args.output;
        this.files = globby.sync(args.files);
        this.executors = backends.getBackendsByNames(args[backend_1.flag])
            .map(function (backend) { return backend.createCommandExecutor(_this.name, logger, args); });
    }
    // execute the command
    AbstractCommand.prototype.process = function () {
        var _this = this;
        // process all files
        this.files.forEach(function (file) {
            _this.processFile(file);
        });
    };
    AbstractCommand.prototype.processFile = function (file) {
        // find the first backend that supports the current file to process
        var executor = this.executors.find(function (e) { return e.supportFile(file); });
        if (executor) {
            executor.process(file, this.outdir);
        }
        else {
            this.logger.eprintln([" No backend from the configured ones are able to process this file: ", file]);
        }
    };
    return AbstractCommand;
}());
exports.AbstractCommand = AbstractCommand;
var AbstractCommandModule = /** @class */ (function () {
    function AbstractCommandModule(name, logger, backends) {
        this.name = name;
        this.logger = logger;
        this.backends = backends;
    }
    AbstractCommandModule.prototype.create = function () {
        var _this = this;
        return {
            command: this.name + " <files>",
            aliases: this.name,
            describe: this.moduleDescription(),
            handler: function (args) {
                _this.createCommand(args).process();
            },
            builder: function (argv) {
                // which backends are available?
                var supportedBackends = _this.backends.getSupportedBackends(_this.name);
                return _this.builder(yargs.positional('files', {
                    describe: 'File pattern (globby notation) for images to create the thumbnails from',
                    type: 'string'
                })
                    // support for -o --output to store the compressed images
                    .option(output_1.flag, output_1.option)
                    // support for the backend option (-b --backend). Compress uses tinify as default
                    .option(backend_1.flag, backend_1.generateOption(supportedBackends))
                    // add options for supported backends
                    .options(_this.backends.generateOptions(supportedBackends)));
            }
        };
    };
    return AbstractCommandModule;
}());
exports.AbstractCommandModule = AbstractCommandModule;
//# sourceMappingURL=command.js.map