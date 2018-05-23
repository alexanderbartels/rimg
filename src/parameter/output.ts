import { Options } from 'yargs';

// -q as command line flag
export const flag: string = 'o';
export const option: Options = {
  alias: 'output',
  description: 'Output directory to store the processed images.',
  type: 'string',
  default: 'out'
};
