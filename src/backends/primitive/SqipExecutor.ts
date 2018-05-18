import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';
import * as path from 'path';
import * as fs from 'fs';
import * as fx from 'mkdir-recursive';
import * as sqip from 'sqip';

export class SqipExecutor implements CommandExecutor {

    tinifyService: any;
    logger: Logger;

    args: any;

    constructor (logger: Logger) {
        this.logger = logger;
    }

    init(args: any) {
        this.args = args;
        return this;
    }

    getTargetFileName(outdir: string, file: path.ParsedPath, suffix: string): string {
        return path.join(outdir, path.format(Object.assign({}, file, {
            name: file.name + suffix,
            ext: '.svg',
            base: undefined
        })));
    }

    process(file: string, outdir: string) {
        // setup target directory
        let target = this.getTargetFileName(outdir, path.parse(path.normalize(file)), '-sqip');
        fx.mkdirSync(path.dirname(target));

        // create sqip image
        let result =  sqip({
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

        let sourceSize = fs.statSync(file).size;
        let targetSize = fs.statSync(target).size;
        let reducedSize = (100 - (targetSize * 100 / sourceSize)).toFixed(2);

        this.logger.println([
            '\t', reducedSize, '% reduced size. ',
            '[size in Byte = ', (targetSize + ''), '; dimension = ',
            result.img_dimensions.width, 'px x ',result.img_dimensions.height, 'px] ',
            '\n\t SVG as Base64: ', result.svg_base64encoded
        ]);
    }

    supportFile(file: string) {
        // Check for file extension if the given file is supported.
        return ['.png', '.jpg', '.jpeg'].indexOf(path.parse(file).ext) !== -1;
    }
 }
