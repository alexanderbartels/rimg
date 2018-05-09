"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// -b as command line flag
exports.flag = 'b';
exports.generateOption = function (defaultBackends) { return ({
    alias: 'backends',
    description: 'Which Backend or Backends should be used to process the command',
    type: 'array',
    default: defaultBackends
}); };
//# sourceMappingURL=backend.js.map