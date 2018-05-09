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
var CompressCommand = /** @class */ (function (_super) {
    __extends(CompressCommand, _super);
    function CompressCommand(name, logger, backends, args) {
        return _super.call(this, name, logger, backends, args) || this;
    }
    return CompressCommand;
}(command_1.AbstractCommand));
exports.CompressCommand = CompressCommand;
var CompressCommandModule = /** @class */ (function (_super) {
    __extends(CompressCommandModule, _super);
    function CompressCommandModule(logger, backends) {
        return _super.call(this, CompressCommandModule.NAME, logger, backends) || this;
    }
    CompressCommandModule.prototype.moduleDescription = function () {
        return 'Compresses the provided images with the goal to reach as small image files as possible';
    };
    CompressCommandModule.prototype.createCommand = function (args) {
        return new CompressCommand(CompressCommandModule.NAME, this.logger, this.backends, args);
    };
    CompressCommandModule.prototype.builder = function (yargs) {
        return yargs;
    };
    CompressCommandModule.NAME = 'compress';
    return CompressCommandModule;
}(command_1.AbstractCommandModule));
exports.CompressCommandModule = CompressCommandModule;
//# sourceMappingURL=index.js.map