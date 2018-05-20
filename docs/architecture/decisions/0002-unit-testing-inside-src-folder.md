# 2. Unit Testing inside src folder

Date: 2018-05-20

## Status

Accepted

## Context

We need to define a location for unit tests. 

## Decision

Unit tests are written inside the src folder. Tests are marked with the `spec` keyword, right before the file extension. If there is a sourcefile named `logger.ts` the unit test should be name `logger.spec.ts`. Sometimes more than one test file is required. E.g. a seperate test for a quiet and a verbose logger. The files should indicate the difference: `logger.quiet.spec.ts` and `logger.verbose.spec.ts` are practical names in this case. But there can even be test for a complete directory. These tests are named by the dirname: `<dirname>.spec.ts`. 

## Consequences

There should be at least one unit test for important functionality. The unit tests are located inside the src folder next to the source file. Tests are written using `mocha`, `chai` and `sinon`. Every unit test contains the `spec` keyword right before the file extension.

*Important:* There must be an unit test for every source file. Because otherwise the `istanbul` doesn't create a true test coverage. Sometime a test for every file don't make sense. For such cases it is ok to create a test for complete directory: `<dirname>.spec.ts`
