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
var index_1 = require("../index");
var index_2 = require("../../commands/compress/index");
var index_3 = require("../../commands/srcset/index");
var thumb_1 = require("../../commands/thumb");
var TinifyCompressionExecutor_1 = require("./TinifyCompressionExecutor");
var TinifySrcsetExecutor_1 = require("./TinifySrcsetExecutor");
var TinifyThumbExecutor_1 = require("./TinifyThumbExecutor");
var TinifyBackend = /** @class */ (function (_super) {
    __extends(TinifyBackend, _super);
    function TinifyBackend(logger) {
        var _this = _super.call(this) || this;
        _this.registerCommandExecutor(index_2.CompressCommandModule.NAME, new TinifyCompressionExecutor_1.TinifyCompressionExecutor(logger));
        _this.registerCommandExecutor(index_3.SrcsetCommandModule.NAME, new TinifySrcsetExecutor_1.TinifySrcsetExecutor(logger));
        _this.registerCommandExecutor(thumb_1.ThumbCommandModule.NAME, new TinifyThumbExecutor_1.TinifyThumbExecutor(logger));
        return _this;
    }
    TinifyBackend.prototype.getName = function () {
        return TinifyBackend.NAME;
    };
    TinifyBackend.prototype.getSupportedCommands = function () {
        return TinifyBackend.SUPPORTED_COMMANDS;
    };
    TinifyBackend.prototype.getOptions = function () {
        return {
            'tinify-proxy': {
                describe: 'Proxy to use, to connect to the tinify services',
                type: 'string'
            },
            'tinify-api-key': {
                describe: 'API Key to get access to the tinify services',
                type: 'string'
            }
        };
    };
    TinifyBackend.NAME = 'tinify';
    TinifyBackend.SUPPORTED_COMMANDS = [index_2.CompressCommandModule.NAME, index_3.SrcsetCommandModule.NAME, thumb_1.ThumbCommandModule.NAME];
    return TinifyBackend;
}(index_1.Backend));
exports.TinifyBackend = TinifyBackend;
//# sourceMappingURL=index.js.map