import { Backend, CommandExecutor } from '../index';
import { Options } from 'yargs';
import { Logger } from '../../util/Logger';

import { CompressCommandModule } from '../../commands/compress/index';
import { SrcsetCommandModule } from '../../commands/srcset/index';
import { ThumbCommandModule } from '../../commands/thumb';
import { TinifyCompressionExecutor } from './TinifyCompressionExecutor';
import { TinifySrcsetExecutor } from './TinifySrcsetExecutor';
import { TinifyThumbExecutor } from './TinifyThumbExecutor';

 export class TinifyBackend extends Backend {
    public static SUPPORTED_FILE_TYPES = ['.png', '.jpg', '.jpeg'];
    private static NAME = 'tinify';
    private static SUPPORTED_COMMANDS = [CompressCommandModule.NAME, SrcsetCommandModule.NAME, ThumbCommandModule.NAME];

    constructor(logger: Logger) {
        super();
        
        this.registerCommandExecutor(CompressCommandModule.NAME, new TinifyCompressionExecutor(logger));
        this.registerCommandExecutor(SrcsetCommandModule.NAME, new TinifySrcsetExecutor(logger));
        this.registerCommandExecutor(ThumbCommandModule.NAME, new TinifyThumbExecutor(logger));
    }

    getName() {
        return TinifyBackend.NAME;
    }

    getSupportedCommands() {
        return TinifyBackend.SUPPORTED_COMMANDS;
    }

    getOptions():  { [flag: string]: Options } {
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
    }
 }

