import 'mocha';  
import { expect } from 'chai';  

import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

describe('Unit Testing', () => {

  it('should have unit tests defined inside the src folder', () => {
    const testFiles = globby.sync('./src/**/*.spec.ts');
    testFiles.forEach((testFile) => {
      const test = path.parse(path.normalize(testFile));
      
      // remove .spec or .some-test-prop.spec.ts
      // => (remove (.*).spec.ts)
      const filename = test.name.substring(0, test.name.indexOf('.'));
      const fileUnderTest = path.format({
        root: test.root,
        dir: test.dir,
        ext: test.ext,
        name: filename
      });
      
      if(!fs.existsSync(fileUnderTest)) {
        // if testcase don't match by file name, check for <dirname>
        expect(test.dir.endsWith(filename)).to.be.equals(true, 
          `Missing file or directory under test (should be: ${fileUnderTest}) for testcase: ${path.format(test)}. See ADR 002 for further informations.`);
      }
    });
  });

  it('should have defined unit tests for all sources', () => {
    const sourceFiles = globby.sync(['./src/**/*.ts', 
      '!./src/**/*.spec.ts', '!./src/**/*.d.ts']);
    const testFiles = globby.sync('./src/**/*.spec.ts');
    

    sourceFiles.forEach((sourceFile) => {
      const src = path.parse(path.normalize(sourceFile));

      let testFilesFound = testFiles.filter((t) => {
        const parsedT = path.parse(path.normalize(t));
        return parsedT.name.startsWith(src.name)
          && src.dir == parsedT.dir;
      });

      if(testFilesFound.length === 0) {
        // check if there is a test for the complete directory
        testFilesFound = testFiles.filter((t) => {
          const parsedT = path.parse(path.normalize(t));
          const filename = parsedT.name.substring(0, parsedT.name.indexOf('.'));
          return src.dir.endsWith(filename)
            && src.dir == parsedT.dir;
        });

        expect(testFilesFound.length).to.be.at.least(1, 
          `Missing Testcase for file (${sourceFile}). See ADR 002 for further informations.`);
      }
    });
  });
});
