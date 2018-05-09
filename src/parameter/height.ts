
import {Options} from 'yargs';

// -q as command line flag
export const flag = 'h';
export const option :Options = {
    alias: 'height',
    description: 'height for the resulting image.',
    demandOption: 'Height must be specified',
    type: 'number',
};

