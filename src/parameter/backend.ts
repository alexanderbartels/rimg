import { Options } from "yargs";

// -b as command line flag
export const flag = "b";
export const generateOption = (defaultBackends: string[]): Options => ({
  alias: "backends",
  description:
    "Which Backend or Backends should be used to process the command",
  type: "array",
  default: defaultBackends
});
