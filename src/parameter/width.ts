
import {Options} from 'yargs';

// -q as command line flag
export const flag = 'w';
export const option :Options = {
    alias: 'width',
    description: 'Width for the resulting image.',
    demandOption: 'Width must be specified',
    type: 'number',
};

