# Contributing a new command

Hello Command-Contrib World.


## Adding a new CLI Parameter

If a new parameter, not special to backend is needed, it should be defined inside the `src/parameter` directory. Create a file with your parameter name: `<param-name>.ts` and don't forget, to include the new param inside the parameter test.

```js
// file: src/parameter/param-name.ts

import {Options} from 'yargs';

export const flag = 'p'; // change to your desired flag. Every common parameter should have a valid flag
export const option :Options = {
    alias: 'param-name',
    description: 'Your Parameter description...',
    demandOption: 'param-name must be specified', // omit this property to make the param optional
    type: 'string', // yargs parameter types for valid options. (e.g. string, number, array)
};
```

Add it to the test case:

```js
// file: src/parameter/parameter.spec.ts

// Add an import for your new command line parameter
import {flag as paramNameFlag} from './param-name';
// ...

// and then add it to the array of flags:
const ALL_CLI_PARAM_FLAGS = [backendFlag /** ,... ,... */,  paramNameFlag];

// ...
// The test case itself don't have to be modified
```
