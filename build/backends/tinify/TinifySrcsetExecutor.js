"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinify = require("tinify");
var fs = require("fs");
var fx = require("mkdir-recursive");
var path = require("path");
var sizeOf = require("image-size");
var TinifySrcsetExecutor = /** @class */ (function () {
    function TinifySrcsetExecutor(logger) {
        this.logger = logger;
    }
    TinifySrcsetExecutor.prototype.init = function (args) {
        this.tinifyService = tinify;
        this.tinifyService.key = args['tinify-api-key'];
        if (args['tinify-proxy']) {
            this.tinifyService.proxy = args['tinify-proxy'];
        }
        return this;
    };
    TinifySrcsetExecutor.prototype.getTargetFileName = function (outdir, file, suffix) {
        return path.join(outdir, path.format(Object.assign({}, file, {
            name: file.name + suffix,
            base: undefined
        })));
    };
    TinifySrcsetExecutor.prototype.processReady = function (err, file, targetX1, targetX2) {
        if (err) {
            this.logger.eprintln(['Unable to compress file: ', file, err]);
        }
        else {
            this.logger.force().println([
                '\n', file, ' -> [', targetX1, ', ', targetX2, ']',
            ]);
            var sourceSize = fs.statSync(file).size;
            var targetX1Size = fs.statSync(targetX1).size;
            var targetX2Size = fs.statSync(targetX2).size;
            var reducedX1Size = (100 - (targetX1Size * 100 / sourceSize)).toFixed(2);
            var reducedX2Size = (100 - (targetX2Size * 100 / sourceSize)).toFixed(2);
            this.logger.println([
                '\t', reducedX1Size, '% reduced file size for -1x',
                '\n\t', reducedX2Size, '% reduced file size for -2x'
            ]);
        }
    };
    TinifySrcsetExecutor.prototype.toFile = function (tinifySource, targetFile) {
        return new Promise(function (resolve, reject) {
            tinifySource.toFile(targetFile, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    TinifySrcsetExecutor.prototype.process = function (file, outdir) {
        var _this = this;
        // TODO target is with -1x appended. 
        var parsedPath = path.parse(path.normalize(file));
        var targetX1 = this.getTargetFileName(outdir, parsedPath, '-1x');
        var targetX2 = this.getTargetFileName(outdir, parsedPath, '-2x');
        // setup target directory
        fx.mkdirSync(path.dirname(targetX1));
        // get width from the input image
        var inputWidth = sizeOf(file).width;
        var targetWidth = Math.round(inputWidth / 2);
        // compress and resize file
        var source = this.tinifyService.fromFile(file);
        var resized = source.resize({
            method: "scale",
            width: targetWidth,
        });
        Promise.all([
            this.toFile(resized, targetX1),
            this.toFile(source, targetX2)
        ]).then(function () {
            _this.processReady(null, file, targetX1, targetX2);
        }, function (err) {
            _this.processReady(err, file, targetX1, targetX2);
        });
    };
    TinifySrcsetExecutor.prototype.supportFile = function (file) {
        // Check for file extension if the given file is supported.
        return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
    };
    return TinifySrcsetExecutor;
}());
exports.TinifySrcsetExecutor = TinifySrcsetExecutor;
//# sourceMappingURL=TinifySrcsetExecutor.js.map