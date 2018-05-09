"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var fx = require("mkdir-recursive");
var sqip = require("sqip");
var SqipExecutor = /** @class */ (function () {
    function SqipExecutor(logger) {
        this.logger = logger;
    }
    SqipExecutor.prototype.init = function (args) {
        this.args = args;
        return this;
    };
    SqipExecutor.prototype.getTargetFileName = function (outdir, file, suffix) {
        return path.join(outdir, path.format(Object.assign({}, file, {
            name: file.name + suffix,
            ext: '.svg',
            base: undefined
        })));
    };
    SqipExecutor.prototype.process = function (file, outdir) {
        // setup target directory
        var target = this.getTargetFileName(outdir, path.parse(path.normalize(file)), '-sqip');
        fx.mkdirSync(path.dirname(target));
        // create sqip image
        var result = sqip({
            filename: file,
            numberOfPrimitives: this.args['primitive-count'],
            mode: this.args['primitive-mode'],
            blur: this.args['primitive-blur']
        });
        // write sqip to svg file
        fs.writeFileSync(target, result.final_svg);
        this.logger.force().println([
            '\n', file, ' -> ', target
        ]);
        var sourceSize = fs.statSync(file).size;
        var targetSize = fs.statSync(target).size;
        var reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);
        this.logger.println([
            '\t', reducedSize, '% reduced size. ',
            '[size in Byte = ', (targetSize + ''), '; dimension = ',
            result.img_dimensions.width, 'px x ', result.img_dimensions.height, 'px] ',
            '\n\t SVG as Base64: ', result.svg_base64encoded
        ]);
    };
    SqipExecutor.prototype.supportFile = function (file) {
        // Check for file extension if the given file is supported.
        return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
    };
    return SqipExecutor;
}());
exports.SqipExecutor = SqipExecutor;
//# sourceMappingURL=SqipExecutor.js.map