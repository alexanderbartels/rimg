# Contributing a new Backend

We will creating the svgo Backend. Just replace the svgo specific parts with your own needs to create a new Backend. Make sure to create an GitHub Issue for it, so others know that this backend will be implemented soon.

## Create a branch 

You cannot develop on the master branch, so make sure to create a feature branch for your contributions: e.g. `git checkout -b feature/svgo-backend`.

## Create the needed files

```bash
// Create the Backend folder: src/backends/<name> 
$ mkdir src/backends/svgo

 // creating the index.ts file to implement the main part of the backend
 $ touch src/backends/svgo/index.ts

 // create a file for each command that can be processed by the new backend.
 // in our case, it is only the compression command that is supported.
 // Filename: <Backendname><Command>Executor.ts
 $ touch src/backends/svgo/SvgoCompressionExecutor.ts
```

## Implement the Backend

Edit your newly created index.ts to implement the Backend:

```ts
import { Backend } from "..";
import { CompressCommandModule } from "../../commands/compress";

// create a class that extends the Backend base class
export class SvgoBackend extends Backend {
  // define the backend name as private static
  private static NAME = 'svgo';

  // define which commands are supported by this backend. 
  // For Each Command a seperate Executor must be created. 
  // In our case only the compress command is supported. 
  // Note: Use the NAME Constants from the command modules 
  // to define which commands are supported.
  private static SUPPORTED_COMMANDS = [CompressCommandModule.NAME];

  // implement the abstract #getName method
  getName() {
    return SvgoBackend.NAME;
  }

  // implement the abstract #getSupportedCommands method
  getSupportedCommands() {
        return SvgoBackend.SUPPORTED_COMMANDS;
  }

  // implement the abstract #getOptions method
  getOptions():  { [flag: string]: Options } {
    return {
      // define backend (and not command) specific command line options. 
      // Prefix all options with your backend name: --backendname-option
      // These options are available to all implemented CommandExecutors.
    }
  }
}
```

## Implement the Command Executor

Edit SvgoCompressionExecutor:

```ts
import { CommandExecutor } from '../index';
import { Logger } from '../../util/Logger';
import * as path from 'path';

// create a class that implements the CommandExecutor interface
export class SvgoCompressionExecutor implements CommandExecutor {

    logger: Logger;

    // the logger will be used to print informations about the processed file to the user. 
    constructor(logger: Logger) {
        this.logger = logger;
    }

    // use init to read the command line options.
    init(args: any) {
      return this;
    }

    //process the file
    process(file: string, outdir: string) {
      // TODO: implement me. 
    }

    // check if this command can process the given file. 
    // If this method return false, the #process method 
    // will not be called with the given file.
    supportFile(file: string) {
        // Check for file extension if the given file is supported.
        return ['.svg'].indexOf(path.parse(file).ext) !== -1;
    }
}
```

After we have implemented the executor, it must be registered at aour backend, so it nows that there is is a `CommandExecutor` for the compression command. Edit your backends index.ts:

```ts
// ...

export class SvgoBackend extends Backend {
  // ...

  // overwrite the constructor to register the new executor
  constructor(logger: Logger) {
    super();

    // register the new compression command
    // first param: Name from the command that will be implemented by the executor
    // second param: The executor instance.
    this.registerCommandExecutor(CompressCommandModule.NAME, new SvgoCompressionExecutor(logger));
  }

  // ...
```

To use the new backend, with its new executors, we need to register the backend itself. This will be done in the `src/rimg.ts` file:

```ts
// Backends definieren
const backends = new Backends();
backends.registerBackend(new TinifyBackend(logger));
backends.registerBackend(new PrimitiveBackend(logger));

// we added this line to register our new svgo backend
backends.registerBackend(new SvgoBackend(logger));
```

##  Test

Test your command and create some automated test cases...

## Documentation

Please create some documentation for the new backend. Look at the `docs` folder to see how other backends are documented.  

## Release 

* Add you new files to git: `git add .``
* commit the changes via `npm run commit`
* Choose `feature` as type of change
* Type `backend` as component of change
* Describe your change
* That change should not be a breaking change
* reference the github issue that was created for this backend
* push the change `git push`

CircleCI and CodeClimate will check your changes. If everything looks good, a manual review will follow. 
