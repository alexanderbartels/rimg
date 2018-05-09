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
var sqip_1 = require("../../commands/sqip");
var SqipExecutor_1 = require("./SqipExecutor");
// primitive backend uses the sqip nodejs module (which uses the primitve binaries)
var PrimitiveBackend = /** @class */ (function (_super) {
    __extends(PrimitiveBackend, _super);
    function PrimitiveBackend(logger) {
        var _this = _super.call(this) || this;
        _this.registerCommandExecutor(sqip_1.SqipCommandModule.NAME, new SqipExecutor_1.SqipExecutor(logger));
        return _this;
    }
    PrimitiveBackend.prototype.getName = function () {
        return PrimitiveBackend.NAME;
    };
    PrimitiveBackend.prototype.getSupportedCommands = function () {
        return PrimitiveBackend.SUPPORTED_COMMANDS;
    };
    PrimitiveBackend.prototype.getOptions = function () {
        return {
            'primitive-count': {
                describe: 'Customize the number of primitive SVG shapes (default=8) to influence bytesize or level of detail',
                type: 'number',
                default: 8
            },
            'primitive-mode': {
                describe: 'Mode (default=0) 0=combo, 1=triangle, 2=rect, 3=ellipse, 4=circle, 5=rotatedrect, 6=beziers, 7=rotatedellipse, 8=polygon',
                type: 'number',
                default: 0
            },
            'primitive-blur': {
                describe: 'Set the gaussian blur (default=12)',
                type: 'number',
                default: 12
            }
        };
    };
    PrimitiveBackend.NAME = 'primitive';
    PrimitiveBackend.SUPPORTED_COMMANDS = [sqip_1.SqipCommandModule.NAME];
    return PrimitiveBackend;
}(index_1.Backend));
exports.PrimitiveBackend = PrimitiveBackend;
//# sourceMappingURL=index.js.map