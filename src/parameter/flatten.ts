
import {Options} from 'yargs';

// -f as command line flag
export const flag = 'f';
export const option : Options = {
    alias: 'flatten',
    description: 'Flatte directory structure. All files are directly written to the specified --output directory if set to true.',
    type: 'boolean',
    default: false
};
