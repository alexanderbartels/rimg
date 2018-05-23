import { expect } from 'chai';
import 'mocha';

import * as fs from 'fs';
import * as globby from 'globby';
import * as path from 'path';

describe('Unit Testing', () => {
  it('should have unit tests defined inside the src folder', () => {
    const testFiles: string[] = globby.sync('./src/**/*.spec.ts');
    testFiles.forEach((testFile: string) => {
      const test: path.ParsedPath = path.parse(path.normalize(testFile));

      // remove .spec or .some-test-prop.spec.ts
      // => (remove (.*).spec.ts)
      const filename: string = test.name.substring(0, test.name.indexOf('.'));
      const fileUnderTest: string = path.format({
        root: test.root,
        dir: test.dir,
        ext: test.ext,
        name: filename
      });

      if (!fs.existsSync(fileUnderTest)) {
        // if testcase don't match by file name, check for <dirname>
        expect(test.dir.endsWith(filename)).to.be.equals(
          true,
          `Missing file or directory under test (should be: ${fileUnderTest}) for testcase: 
          ${path.format(test)}. See ADR 002 for further informations.`
        );
      }
    });
  });

  it('should have defined unit tests for all sources', () => {
    const sourceFiles: string[] = globby.sync([
      './src/**/*.ts',
      '!./src/**/*.spec.ts',
      '!./src/**/*.d.ts'
    ]);
    const testFiles: string[] = globby.sync('./src/**/*.spec.ts');

    sourceFiles.forEach(sourceFile => {
      const src: path.ParsedPath = path.parse(path.normalize(sourceFile));

      let testFilesFound: string[] = testFiles.filter((t: string) => {
        const parsedT: path.ParsedPath = path.parse(path.normalize(t));

        return parsedT.name.startsWith(src.name) && src.dir === parsedT.dir;
      });

      if (testFilesFound.length === 0) {
        // check if there is a test for the complete directory
        testFilesFound = testFiles.filter((t: string) => {
          const p: path.ParsedPath = path.parse(path.normalize(t));
          const filename: string = p.name.substring(0, p.name.indexOf('.'));

          return src.dir.endsWith(filename) && src.dir === p.dir;
        });

        expect(testFilesFound.length).to.be.at.least(
          1,
          `Missing Testcase for file (${sourceFile}). See ADR 002 for further informations.`
        );
      }
    });
  });
});
