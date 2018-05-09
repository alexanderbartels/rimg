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
var width_1 = require("../../parameter/width");
var height_1 = require("../../parameter/height");
var command_1 = require("../command");
var ThumbCommand = /** @class */ (function (_super) {
    __extends(ThumbCommand, _super);
    function ThumbCommand(name, logger, backends, args) {
        return _super.call(this, name, logger, backends, args) || this;
    }
    return ThumbCommand;
}(command_1.AbstractCommand));
exports.ThumbCommand = ThumbCommand;
var ThumbCommandModule = /** @class */ (function (_super) {
    __extends(ThumbCommandModule, _super);
    function ThumbCommandModule(logger, backends) {
        return _super.call(this, ThumbCommandModule.NAME, logger, backends) || this;
    }
    ThumbCommandModule.prototype.moduleDescription = function () {
        return 'Creates a thumbnail for the provided images.';
    };
    ThumbCommandModule.prototype.createCommand = function (args) {
        return new ThumbCommand(ThumbCommandModule.NAME, this.logger, this.backends, args);
    };
    ThumbCommandModule.prototype.builder = function (yargs) {
        return yargs
            // add options for witdh and height
            .option(width_1.flag, width_1.option)
            .option(height_1.flag, height_1.option);
    };
    ThumbCommandModule.NAME = 'thumb';
    return ThumbCommandModule;
}(command_1.AbstractCommandModule));
exports.ThumbCommandModule = ThumbCommandModule;
//# sourceMappingURL=index.js.map