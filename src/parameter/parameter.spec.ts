import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

// import all params
import { flag as backendFlag } from "./backend";
import { flag as flattenFlag } from "./flatten";
import { flag as heightFlag } from "./height";
import { flag as outputFlag } from "./output";
import { flag as quietFlag } from "./quiet";
import { flag as widthFlag } from "./width";

describe("CLI Parameter", () => {
  // hint: If a new Param was created, it should be added here to the array.
  const ALL_CLI_PARAM_FLAGS = [
    backendFlag,
    flattenFlag,
    heightFlag,
    outputFlag,
    quietFlag,
    widthFlag
  ];

  it("should have unique flags", () => {
    // A set only contains unique values
    const uniqueFlags = new Set(ALL_CLI_PARAM_FLAGS);
    expect(ALL_CLI_PARAM_FLAGS).to.have.lengthOf(uniqueFlags.size);
  });
});
