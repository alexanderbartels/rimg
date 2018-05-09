"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("../command");
var SqipCommand = /** @class */ (function (_super) {
    __extends(SqipCommand, _super);
    function SqipCommand(name, logger, backends, args) {
        return _super.call(this, name, logger, backends, args) || this;
    }
    SqipCommand.prototype.process = function () {
        var _this = this;
        // process all files
        this.files.forEach(function (file) {
            // find the first backend that supports the current file to process
            var executor = _this.executors.find(function (e) { return e.supportFile(file); });
            if (executor) {
                executor.process(file, _this.outdir);
            }
            else {
                _this.logger.eprintln([" No backend from the configured ones are able to process this file: ", file]);
            }
        });
    };
    return SqipCommand;
}(command_1.AbstractCommand));
exports.SqipCommand = SqipCommand;
var SqipCommandModule = /** @class */ (function (_super) {
    __extends(SqipCommandModule, _super);
    function SqipCommandModule(logger, backends) {
        return _super.call(this, SqipCommandModule.NAME, logger, backends) || this;
    }
    SqipCommandModule.prototype.moduleDescription = function () {
        return 'Generates a svg placeholder image using the sqip method';
    };
    SqipCommandModule.prototype.createCommand = function (args) {
        return new SqipCommand(SqipCommandModule.NAME, this.logger, this.backends, args);
    };
    SqipCommandModule.prototype.builder = function (yargs) {
        return yargs;
        // TODO add custom sqip options.
    };
    SqipCommandModule.NAME = 'sqip';
    return SqipCommandModule;
}(command_1.AbstractCommandModule));
exports.SqipCommandModule = SqipCommandModule;
//# sourceMappingURL=index.js.map