import { Backend } from '../index';
import { SqipCommandModule } from '../../commands/sqip';
import { Options } from 'yargs';
import { Logger } from '../../util/Logger';
import { SqipExecutor } from './SqipExecutor';


// primitive backend uses the sqip nodejs module (which uses the primitve binaries)
 export class PrimitiveBackend extends Backend {
    private static NAME = 'primitive';
    private static SUPPORTED_COMMANDS = [SqipCommandModule.NAME];

    constructor(logger: Logger) {
        super();

        this.registerCommandExecutor(SqipCommandModule.NAME, new SqipExecutor(logger));
    }

    getName() {
        return PrimitiveBackend.NAME;
    }

    getSupportedCommands() {
        return PrimitiveBackend.SUPPORTED_COMMANDS;
    }

    getOptions():  { [flag: string]: Options } {
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
        }
    }
 }



