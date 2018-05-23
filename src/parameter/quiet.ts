import { Options } from 'yargs';

// -q as command line flag
export const flag: string = 'q';
export const option: Options = {
  alias: 'quiet',
  description:
    'In quiet mode only successfully processed images are printed to std out.',
  type: 'boolean',
  default: false
};
