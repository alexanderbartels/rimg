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
var SrcsetCommand = /** @class */ (function (_super) {
    __extends(SrcsetCommand, _super);
    function SrcsetCommand(name, logger, backends, args) {
        return _super.call(this, name, logger, backends, args) || this;
    }
    return SrcsetCommand;
}(command_1.AbstractCommand));
exports.SrcsetCommand = SrcsetCommand;
var SrcsetCommandModule = /** @class */ (function (_super) {
    __extends(SrcsetCommandModule, _super);
    function SrcsetCommandModule(logger, backends) {
        return _super.call(this, SrcsetCommandModule.NAME, logger, backends) || this;
    }
    SrcsetCommandModule.prototype.moduleDescription = function () {
        return 'Creates a srcset (1x and 2x resolution) for the provided images. '
            + 'Provided Image must be in 2x resolution. -1x and -2x will '
            + 'be appended the created files';
    };
    SrcsetCommandModule.prototype.createCommand = function (args) {
        return new SrcsetCommand(SrcsetCommandModule.NAME, this.logger, this.backends, args);
    };
    SrcsetCommandModule.prototype.builder = function (yargs) {
        return yargs;
        // TODO add custom sqip options.
    };
    SrcsetCommandModule.NAME = 'srcset';
    return SrcsetCommandModule;
}(command_1.AbstractCommandModule));
exports.SrcsetCommandModule = SrcsetCommandModule;
//# sourceMappingURL=index.js.map