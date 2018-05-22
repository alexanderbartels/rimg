import { expect } from 'chai';
import 'mocha';

import * as fs from 'fs';

describe('Record Architecture Decisions', () => {

  it('should have a test for every Architecture Decision Record', () => {
    // verify that a *.spec.ts file exists for every adr inside docs/architecture/decisions
    const adrs = fs.readdirSync('./docs/architecture/decisions');

    adrs.forEach((file) => {
      const testFilename = file.replace('.md', '.spec.ts');
      const testFile = `./test/adr/${testFilename}`;

      expect(fs.existsSync(testFile)).to.be.equals(true,
                                                   `Missing test ${testFile} for its ADR ${file}`);
    });
  });

  it('should be published to the documenation website', () => {
    // verify that each adr is linked from the _sidebar.md file.
    const adrs = fs.readdirSync('./docs/architecture/decisions');
    const sidebar = fs.readFileSync('./docs/_sidebar.md');

    adrs.forEach((file) => {
      expect(sidebar.indexOf(`](architecture/decisions/${file})`) !== -1).to.be.equals(true,
                                                                                       `Missing link to ADR ${file} from our documentation website. Please inlcude a link inside the docs/_sidebar.md file.`);
    });
  });
});
