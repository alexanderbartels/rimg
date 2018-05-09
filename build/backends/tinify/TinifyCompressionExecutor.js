"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinify = require("tinify");
var fs = require("fs");
var fx = require("mkdir-recursive");
var path = require("path");
var TinifyCompressionExecutor = /** @class */ (function () {
    function TinifyCompressionExecutor(logger) {
        this.logger = logger;
    }
    TinifyCompressionExecutor.prototype.init = function (args) {
        this.tinifyService = tinify;
        this.tinifyService.key = args['tinify-api-key'];
        if (args['tinify-proxy']) {
            this.tinifyService.proxy = args['tinify-proxy'];
        }
        return this;
    };
    TinifyCompressionExecutor.prototype.process = function (file, outdir) {
        var _this = this;
        // setup target directory
        var target = path.join(outdir, path.normalize(file));
        fx.mkdirSync(path.dirname(target));
        // compress file
        var source = this.tinifyService.fromFile(file);
        source.toFile(target, function (err) {
            if (err) {
                _this.logger.eprintln(['Unable to compress file: ', file]);
            }
            else {
                _this.logger.force().println([
                    '\n', file, ' -> ', target
                ]);
                var sourceSize = fs.statSync(file).size;
                var targetSize = fs.statSync(target).size;
                var reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);
                _this.logger.println([
                    '\t', reducedSize, "% reduced size after compression"
                ]);
            }
        });
    };
    TinifyCompressionExecutor.prototype.supportFile = function (file) {
        // Check for file extension if the given file is supported.
        return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
    };
    return TinifyCompressionExecutor;
}());
exports.TinifyCompressionExecutor = TinifyCompressionExecutor;
//# sourceMappingURL=TinifyCompressionExecutor.js.map