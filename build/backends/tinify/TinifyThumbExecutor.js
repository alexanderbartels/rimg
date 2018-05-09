"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinify = require("tinify");
var fs = require("fs");
var fx = require("mkdir-recursive");
var path = require("path");
var TinifyThumbExecutor = /** @class */ (function () {
    function TinifyThumbExecutor(logger) {
        this.logger = logger;
    }
    TinifyThumbExecutor.prototype.init = function (args) {
        this.args = args;
        this.tinifyService = tinify;
        this.tinifyService.key = args['tinify-api-key'];
        if (args['tinify-proxy']) {
            this.tinifyService.proxy = args['tinify-proxy'];
        }
        return this;
    };
    TinifyThumbExecutor.prototype.getTargetFileName = function (outdir, file, suffix) {
        return path.join(outdir, path.format(Object.assign({}, file, {
            name: file.name + suffix,
            base: undefined
        })));
    };
    TinifyThumbExecutor.prototype.process = function (file, outdir) {
        var _this = this;
        // setup target directory
        var target = this.getTargetFileName(outdir, path.parse(path.normalize(file)), '-thumb');
        fx.mkdirSync(path.dirname(target));
        // compress file
        var source = this.tinifyService.fromFile(file);
        var thumbed = source.resize({
            method: "thumb",
            width: this.args.width,
            height: this.args.height
        });
        thumbed.toFile(target, function (err) {
            if (err) {
                _this.logger.eprintln(['Unable to create thumbnail for file: ', file, err]);
            }
            else {
                _this.logger.force().println([
                    '\n', file, ' -> ', target
                ]);
                var sourceSize = fs.statSync(file).size;
                var targetSize = fs.statSync(target).size;
                var reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);
                _this.logger.println([
                    '\t', reducedSize, "% reduced size through thumbnail creation"
                ]);
            }
        });
    };
    TinifyThumbExecutor.prototype.supportFile = function (file) {
        // Check for file extension if the given file is supported.
        return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
    };
    return TinifyThumbExecutor;
}());
exports.TinifyThumbExecutor = TinifyThumbExecutor;
//# sourceMappingURL=TinifyThumbExecutor.js.map